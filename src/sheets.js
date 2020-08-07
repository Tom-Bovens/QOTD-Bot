function getAuthenticatedClient() {
  return new Promise((resolve, reject) => {
    // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
    // which should be downloaded from the Google Developers Console.
    const oAuth2Client = new OAuth2Client(
      keys.web.client_id,
      keys.web.client_secret,
      keys.web.redirect_uris[0]
      );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/drive.readonly, https://www.googleapis.com/auth/spreadsheets.readonly',
  });

    // Open an http server to accept the oauth callback. In this simple example, the
    // only request to our webserver is to /oauth2callback?code=<code>
    const server = http
    .createServer(async (req, res) => {
        try {
            // acquire the code from the querystring, and close the web server.
            const qs = new url.URL(req.url, 'http://localhost:4000').searchParams;
            const code = qs.get('code');
            console.log(`Code is ${code}`);guest
            res.end('Authentication successful! Please return to the console.');
            server.destroy();

            // Now that we have the code, use that to acquire tokens.
            const r = await oAuth2Client.getToken(code);
            // Make sure to set the credentials on the OAuth2 client.
            oAuth2Client.setCredentials(r.tokens);
            console.info('Tokens acquired.', r.tokens);
            resolve(oAuth2Client);
        } catch (e) {
          reject(e);
      }
  })
    .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        open(authorizeUrl, {wait: false}).then(cp => cp.unref());
    });
    destroyer(server);
});
}

const findQuote = async () => {
    const answer = [
        ['1-8-2020', 'He who knows best knows how little he knows.', 'Thomas Jefferson'],
        ['2-8-2020', 'Love yourself first, then everything else falls into place.', 'Lucille Ball'],
        ['3-8-2020', "You miss 100% of the shots you don't take.", 'Wayne Gretzky'],
        ['4-8-2020', 'Luck is what happens when preparation meets opportunity.', 'Seneca'],
        ['5-8-2020', 'If you want a rainbow, you will have to put up with rain.', 'Dolly Parton'],
        ['6-8-2020', "If you don't stand something, you'll fall for anything.", 'Malcolm X'],
        ['7-8-2020', "You can't use up creativity. The more you use, the more you have.", 'Maya Angelou'],
        ['8-8-2020', 'Life is short, and it is here to be lived.', 'Kate Winslet'],
        ['9-8-2020', 'Live as you were to die tomorrow. Learn as if you were to live forever.', 'Mahatma Gandhi'],
        ['10-8-2020', 'Great acts are made up of small deeds.', 'Lao Tzu'],
        ['11-8-2020', 'All our dreams can come true if we have the courage to pursue them.', 'Walt Disney'],
        ['12-8-2020', 'Every moment wasted looking back keeps us from moving forward.', 'Hillary Clinton'],
        ['13-8-2020', 'You must do the things you think you cannot do.', 'Eleanor Roosevelt'],
        ['14-8-2020', "Life isn't about finding yourself. It's about creating yourself.", 'George Bernard Shaw'],
        ['15-8-2020', "Don't let the fear of striking out hold you back.", 'Babe Ruth'],
        ['16-8-2020', "Many of life's failures are people who did not realize how close they were to success.", 'Thomas A. Edison'],
        ['17-8-2020', "Change what your perception of what a miracle is and you'll see them all around you.", 'Jon Bon Jovi'],
        ['18-8-2020', "No'one can make you feel inferior without your consent.", 'Eleanor Roosevelt'],
        ['19-8-2020', 'Be the change you wish to see in the world.', 'Mahatma Gandhi'],
        ['20-8-2020', "You can't see yourself clearly until you see yourself through the eyes of others.", 'Ellen DeGeneres'],
        ['21-8-2020', 'A new broom sweeps clean but an old broom knows the corners.', 'Unknown'],
        ['22-8-2020', 'Give a man a fish and you feed him for a day. Teach him to fish and he will eat forever.', 'Unknown'],
        ['23-8-2020', 'Lost time is never found again.', 'Benjamin Franklin'],
        ['24-8-2020', 'Proberbs are short sentences drawn from long experience.', 'Cervantes'],
        ['25-8-2020', 'Life is a journey, not a destination.', 'Ralph Waldo Emerson'],
        ['26-8-2020', 'The truly rich are those who enjoy what they have.', 'Unknown'],
        ['27-8-2020', 'You have to take the bitter with the sweet.', 'Unknown'],
        ['28-8-2020', 'No pressure, no diamonds.', 'Thomas Carlyle'],
        ['29-8-2020', "If at first you don't succeed. Try, try again.", 'William Edward Hickson'],
        ['30-8-2020', "Don't go through life, grow through life.", 'Eric Butterworth'],
        ['31-8-2020', 'Every novel is a mystery novel if you never finish it.', 'Unknown'],
        ['1-9-2020', 'Every novel is a mystery novel if you never finish it.', 'Unknown'],
    ];
    const date = new Date()
    const dayDate = date.getDate()
    const currentArray = answer[(dayDate - 1)]
    const quote = currentArray[1]
    return quote
};

module.exports = findQuote;

