const axios = require('axios');
const nodemailer = require('nodemailer');
const readline = require('readline');

// Create a readline interface for interactive input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Prompt the user for input
rl.question('Enter the website URL to monitor: ', (url) => {
    rl.question('Enter the recipient email address: ', (email) => {
        const TARGET_URL = url;
        const RECIPIENT_EMAIL = email;
        const CHECK_INTERVAL = 10; // Interval in seconds
        const EMAIL = 'no.reply.thera@gmail.com'; // Replace with your sender email
        const EMAIL_PASSWORD = 'nglk mjry husb pqxx'; // Replace with your sender email password

        // Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: EMAIL_PASSWORD,
            },
        });

        // Function to send an email alert
        const sendAlertEmail = async (url, error) => {
            try {
                await transporter.sendMail({
                    from: EMAIL,
                    to: RECIPIENT_EMAIL,
                    subject: `ALERT: ${url} is down!`,
                    text: `The website ${url} is not responding as expected.\n\n\nThis is an automated message generated by Thera Bot created by Satyam Mayengbam (22WJ1A05U5)  in partial fulfillment of the semester LAB project in DevOps under my faculty, Mr. Raveendra K\n\nError: ${error.message || error}`,
                });
                console.log(`Alert email sent to ${RECIPIENT_EMAIL}`);
            } catch (err) {
                console.error('Failed to send alert email:', err);
            }
        };

        // Function to check the target URL
        const checkWebsite = async () => {
            try {
                const response = await axios.get(TARGET_URL);
                if (response.status === 200) {
                    console.log(`[OK] ${TARGET_URL} is up.`);
                } else {
                    console.log(`[ALERT] ${TARGET_URL} returned status ${response.status}`);
                    sendAlertEmail(TARGET_URL, `Status: ${response.status}`);
                }
            } catch (err) {
                console.log(`[ALERT] ${TARGET_URL} is down.`);
                sendAlertEmail(TARGET_URL, err);
            }
        };

        // Schedule the website check
        setInterval(checkWebsite, CHECK_INTERVAL * 1000);
        console.log(`Monitoring ${TARGET_URL} every ${CHECK_INTERVAL} seconds...`);

        // Close the readline interface after starting the monitoring
        rl.close();
    });
});
