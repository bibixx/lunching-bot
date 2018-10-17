const fs = require('fs');
const readline = require('readline');
const readFilePromise = require('fs-readfile-promise');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  try {
    token = process.env.TOKEN;
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch (err) {
    await getNewToken(oAuth2Client);
  }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client) {
  return new Promise((resolve) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    console.log('Authorize this app by visiting this url:', authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);

        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });

        resolve(oAuth2Client);
      });
    });
  })
}


const getProduct = async () => {
  // const content = await readFilePromise('credentials.json')
  const content = process.env.CREDENTIALS
  const auth = await authorize(JSON.parse(content));
  const sheets = google.sheets({version: 'v4', auth});

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      spreadsheetId: '1fSlCxYsfRH8yloOMYxfdxPB2YRLCvIhnSBEqNYsRWN4',
      range: 'Arkusz1!A2:D',
    }, (err, res) => {
      if (err) {
        reject('The API returned an error: ' + err)
      }

      const rows = res.data.values;

      if (rows.length) {
        const row = rows.find(row => row && row[3] === undefined) || [];
        resolve(row.slice(0, 2));
      } else {
        reject('No data found.');
      }
    });
  })
}

module.exports = getProduct;
