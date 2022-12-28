<h1>Canada Job Scraper</h1>

<p>This code uses <a href="https://cheerio.js.org/">Cheerio</a> and <a href="https://pptr.dev/">Puppeteer</a> to scrape job listings from the <a href="https://www.jobbank.gc.ca">Government of Canada Job Bank</a> website. The user can specify the job title and province to search for, as well as the number of pages of results to scrape. The scraped data can be saved to a database, saved as a CSV file, and/or used to send emails to the listed employers.</p>

<h2>Live Version</h2>

<a href="https://stellular-praline-beb11a.netlify.app/" target="_blank">View Scraped Data</a>
<p>Front end from the <a href="https://github.com/M3D3L/CanadaJobScraperFrontEnd" target="_blank">Canada Job Scraper FrontEnd</a> project</p>

<h2>Requirements</h2>
<ul>
  <li>Node.js</li>
  <li>npm (comes with Node.js)</li>
</ul>

<h2>Setup</h2>
<ol>
  <li>Install the required packages by running <code>npm install</code></li>
  <li>Modify the following values in the code to your desired values:
    <ul>
      <li><code>name</code>: Your name</li>
      <li><code>phone</code>: Your phone number</li>
      <li><code>numberOfPages</code>: The number of pages of job listings to scrape</li>
      <li><code>jobTitle</code>: The job title to search for (leave empty to search for all jobs)</li>
      <li><code>province</code>: The province to search in (leave empty to search in all provinces)</li>
      <li><code>email</code>: Your email address</li>
      <li><code>password</code>: Your Google App Password (obtain one <a href="https://myaccount.google.com/apppasswords">here</a>)</li>
      <li><code>.env</code>: create a .env file if one does not exist with your email settings in the sendMail.js file</li>
    </ul>
  </li>
  <li>(Optional) Modify the following values in the code to customize the email template:
    <ul>
      <li><code>facebook</code>: Your Facebook profile URL</li>
      <li><code>linkedin</code>: Your LinkedIn profile URL</li>
      <li><code>twitter</code>: Your Twitter profile URL</li>
      <li><code>profilePic</code>: URL of your profile picture to include in the email</li>
      <li><code>skills</code>: An array of your skills to include in the email</li>
      <li><code>emailTitleLine1</code>: The first line of the email title</li>
      <li><code>emailTitleLine2</code>: The second line of the email title</li>
      <li><code>message</code>: The body message of the email</li>
    </ul>
  </li>
  <li>(Optional) Modify the <code>template</code> variable to customize the email template HTML. The template file is <code>email.html</code></li>
</ol>

<h2>Usage</h2>
<ol>
  <li>Run the code with <code>npm run start</code></li>
  <li>The scraped data will be saved to a database and/or CSV file if specified, and emails will be sent if specified.</li>
  <li>Converter.js file can be run after running your index.js if you saved the db. It converts the db to json.</li>
</ol>

<h2>Notes</h2>
<ul>
  <li>The code includes a random timeout between requests to avoid being blocked by the website.</li>
  <li>Email template from <a href="https://unlayer.com/templates">https://unlayer.com/</a></li>
  <li>The code uses the <code>template</code> variable as an HTML template for the emails. You can use the provided <code>email.html</code> file as a starting point, or create your own template.</li>
  <li>The code uses the <a href="https://nodemailer.com/about/">Nodemailer</a> package to send emails through Google's SMTP server. You will need to provide your email address and a <a href="https://myaccount.google.com/apppasswords">Google App Password</a> in order to send emails.</li>
  <li>The code uses the <a href="https://www.npmjs.com/package/dotenv">dotenv</a> package to allow us to save our email data in a .env file 
  </li>
</ul>