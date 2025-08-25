const html_doc = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Hyperion</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* Reset and Base Styles */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            background-color: #0b0f1a;
            color: #e0e6f2;
            line-height: 1.6;
        }

        .email-container {
            max-width: 650px;
            margin: 0 auto;
            background: #111521;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #2a3449;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .hero-section {
            text-align: center;
            padding: 50px 30px;
            background: linear-gradient(135deg, #1c263a 0%, #111521 100%);
            position: relative;
            overflow: hidden;
            border-bottom: 2px solid #2a3449;
        }

        .hero-section h1 {
            font-size: 32px;
            font-weight: 700;
            color: #d1e4ff;
            margin: 0 0 15px;
            text-shadow: 0 0 8px rgba(209, 228, 255, 0.5);
        }

        .hero-section p {
            font-size: 16px;
            max-width: 450px;
            margin: 0 auto;
            color: #aebfd5;
        }

        .content-section {
            padding: 40px 30px;
            background-color: #111521;
        }

        .cta-button {
            display: inline-block;
            padding: 16px 32px;
            margin-top: 30px;
            background: linear-gradient(45deg, #007bff, #0056b3);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(0, 123, 255, 0.5);
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 40px;
        }
        
        @media only screen and (max-width: 480px) {
             .feature-grid {
                grid-template-columns: 1fr;
             }
        }

        .feature-item {
            background-color: #1a2233;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            border: 1px solid #2a3449;
            transition: background-color 0.3s ease;
        }

        .feature-item:hover {
            background-color: #202b40;
        }

        .feature-icon {
            font-size: 28px;
            margin-bottom: 10px;
            color: #00aaff;
            text-shadow: 0 0 10px rgba(0, 170, 255, 0.4);
        }

        .feature-item h3 {
            margin: 0 0 5px;
            font-size: 16px;
            font-weight: 600;
            color: #aebfd5;
        }

        .feature-item p {
            font-size: 14px;
            color: #8c9cb5;
            margin: 0;
        }

        .footer-section {
            background-color: #1a2233;
            padding: 25px 30px;
            text-align: center;
            font-size: 13px;
            color: #6a7c98;
            border-top: 1px solid #2a3449;
        }

        .footer-section a {
            color: #8c9cb5;
            text-decoration: none;
            margin: 0 8px;
            transition: color 0.3s ease;
        }

        .footer-section a:hover {
            color: #d1e4ff;
        }

        /* Responsive Styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                border-radius: 0;
            }
            .hero-section {
                padding: 40px 20px;
            }
            .hero-section h1 {
                font-size: 28px;
            }
            .content-section {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <div style="background-color: #0b0f1a; padding: 20px 0;">
        <div class="email-container">
            <div class="hero-section" style="background: linear-gradient(135deg, #1c263a 0%, #111521 100%); position: relative; overflow: hidden; border-bottom: 2px solid #2a3449; padding: 50px 30px; text-align: center;">
                <h1 style="font-size: 32px; font-weight: 700; color: #d1e4ff; margin: 0 0 15px; text-shadow: 0 0 8px rgba(209, 228, 255, 0.5);">
                    Welcome to Stack Boat 🚀
                </h1>
                <p style="font-size: 16px; max-width: 450px; margin: 0 auto; color: #aebfd5;">
                    Your journey to enhanced productivity and intelligent solutions begins now.
                </p>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.15; z-index: 0;">
                    <span style="position: absolute; top: 10%; left: 5%; font-size: 30px;">🧠</span>
                    <span style="position: absolute; top: 30%; right: 10%; font-size: 25px;">💡</span>
                    <span style="position: absolute; bottom: 15%; left: 20%; font-size: 22px;">⚡</span>
                    <span style="position: absolute; top: 50%; left: 15%; font-size: 28px;">💻</span>
                    <span style="position: absolute; bottom: 5%; right: 30%; font-size: 35px;">⚙️</span>
                    <span style="position: absolute; top: 25%; right: 45%; font-size: 20px;">🌐</span>
                    <span style="position: absolute; top: 60%; right: 25%; font-size: 32px;">🤖</span>
                    <span style="position: absolute; bottom: 20%; left: 40%; font-size: 26px;">🚀</span>
                </div>
            </div>

            <div class="content-section" style="padding: 40px 30px; background-color: #111521; position: relative; overflow: hidden;">
                <p style="font-size: 16px; color: #e0e6f2; margin-bottom: 25px;">
                    Hi there,
                </p>
                <p style="font-size: 16px; color: #aebfd5; margin-bottom: 25px;">
                    Our platform provides a unified space for intermediate developers to access AI-powered tools in domains like **Cybersecurity, MERN stack, Web Development, Data Science, Machine Learning, and Python** — designed to boost productivity and speed up your workflow.
                </p>

                <p style="text-align: center; margin-top: 30px;">
                    <a href="#" class="cta-button" style="display: inline-block; padding: 16px 32px; background: linear-gradient(45deg, #007bff, #0056b3); color: white; text-decoration: none; border-radius: 50px; font-weight: 600; letter-spacing: 0.5px; transition: transform 0.2s ease, box-shadow 0.2s ease; box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);">
                        Explore Tools Now
                    </a>
                </p>

                <div style="text-align: center; margin: 40px 0;">
                    <hr style="border: none; height: 1px; background-color: #2a3449; margin: 0; width: 50%; display: inline-block;">
                </div>
                
                <h2 style="font-size: 24px; font-weight: 600; color: #d1e4ff; margin-bottom: 20px; text-align: center;">Why Developers Trust Us</h2>

                <div class="feature-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                    <div class="feature-item" style="background-color: #1a2233; border-radius: 10px; padding: 20px; text-align: center; border: 1px solid #2a3449;">
                        <div class="feature-icon" style="font-size: 28px; margin-bottom: 10px; color: #00aaff; text-shadow: 0 0 10px rgba(0, 170, 255, 0.4);">⚡</div>
                        <h3 style="margin: 0 0 5px; font-size: 16px; font-weight: 600; color: #aebfd5;">Faster Development</h3>
                        <p style="font-size: 14px; color: #8c9cb5; margin: 0;">Automate repetitive tasks and accelerate your workflow.</p>
                    </div>

                    <div class="feature-item" style="background-color: #1a2233; border-radius: 10px; padding: 20px; text-align: center; border: 1px solid #2a3449;">
                        <div class="feature-icon" style="font-size: 28px; margin-bottom: 10px; color: #00aaff; text-shadow: 0 0 10px rgba(0, 170, 255, 0.4);">🧠</div>
                        <h3 style="margin: 0 0 5px; font-size: 16px; font-weight: 600; color: #aebfd5;">Smarter Productivity</h3>
                        <p style="font-size: 14px; color: #8c9cb5; margin: 0;">Access intelligent tools that learn and adapt to your needs.</p>
                    </div>

                    <div class="feature-item" style="background-color: #1a2233; border-radius: 10px; padding: 20px; text-align: center; border: 1px solid #2a3449;">
                        <div class="feature-icon" style="font-size: 28px; margin-bottom: 10px; color: #00aaff; text-shadow: 0 0 10px rgba(0, 170, 255, 0.4);">🌐</div>
                        <h3 style="margin: 0 0 5px; font-size: 16px; font-weight: 600; color: #aebfd5;">Wide Tech Stacks</h3>
                        <p style="font-size: 14px; color: #8c9cb5; margin: 0;">Solutions tailored for a variety of popular development stacks.</p>
                    </div>

                    <div class="feature-item" style="background-color: #1a2233; border-radius: 10px; padding: 20px; text-align: center; border: 1px solid #2a3449;">
                        <div class="feature-icon" style="font-size: 28px; margin-bottom: 10px; color: #00aaff; text-shadow: 0 0 10px rgba(0, 170, 255, 0.4);">🔒</div>
                        <h3 style="margin: 0 0 5px; font-size: 16px; font-weight: 600; color: #aebfd5;">Secure AI Tools</h3>
                        <p style="font-size: 14px; color: #8c9cb5; margin: 0;">Your data and privacy are our top priority with secure AI.</p>
                    </div>
                </div>
            </div>

            <div class="footer-section" style="background-color: #1a2233; padding: 25px 30px; text-align: center; font-size: 13px; color: #6a7c98; border-top: 1px solid #2a3449;">
                <p>
                    <a href="#" style="color: #8c9cb5; text-decoration: none; margin: 0 8px; transition: color 0.3s ease;">LinkedIn</a> |
                    <a href="#" style="color: #8c9cb5; text-decoration: none; margin: 0 8px; transition: color 0.3s ease;">Twitter</a> |
                    <a href="#" style="color: #8c9cb5; text-decoration: none; margin: 0 8px; transition: color 0.3s ease;">GitHub</a>
                </p>
                <p>
                    Need help? Contact us at <a href="mailto:support@brandname.com" style="color: #8c9cb5; text-decoration: none;">support@brandname.com</a>
                </p>
                <p style="margin-top: 15px;">
                    © 2024 [Brand Name]. All Rights Reserved.
                </p>
                <p style="margin-top: 10px;">
                    <a href="#" style="color: #6a7c98; font-size: 12px; text-decoration: underline;">Unsubscribe</a>
                </p>
            </div>

        </div>
    </div>
</body>
</html> `;


//  doc for pdf format 
const html_doc_pdf =`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to [Brand Name] 🚀</title>
    <style>
        /* CSS Reset and Base Styles */
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #0d121c; /* Dark background */
            color: #d1d9e2;
            -webkit-text-size-adjust: none;
            line-height: 1.6;
            mso-line-height-rule: exactly;
        }

        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        td {
            padding: 0;
        }

        img {
            border: 0;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        a {
            text-decoration: none;
            color: #00b3ff;
        }

        /* Container for the email */
        .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #151a24;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }

        /* Hero Section */
        .hero-section {
            background: linear-gradient(135deg, #1d263a 0%, #151a24 100%);
            padding: 50px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero-section h1 {
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 15px;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
        }

        .hero-section p {
            font-size: 16px;
            max-width: 450px;
            margin: 0 auto;
            color: #aebfd5;
        }

        /* Animated background elements (for visual flair) */
        .hero-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0.1;
            z-index: 0;
        }
        
        .hero-bg span {
            position: absolute;
            font-size: 30px;
            color: #00b3ff;
            animation: float 10s infinite ease-in-out;
        }
        
        .hero-bg .ai { top: 15%; left: 10%; font-size: 35px; animation-delay: 0s; }
        .hero-bg .reason { top: 40%; right: 5%; font-size: 25px; animation-delay: 2s; }
        .hero-bg .chat { bottom: 10%; left: 25%; font-size: 28px; animation-delay: 4s; }
        .hero-bg .output { top: 5%; right: 20%; font-size: 40px; animation-delay: 6s; }
        .hero-bg .ship { bottom: 20%; right: 15%; font-size: 32px; animation-delay: 8s; }
        .hero-bg .iot { top: 60%; left: 30%; font-size: 22px; animation-delay: 10s; }
        
        @keyframes float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(10px, -10px); }
            100% { transform: translate(0, 0); }
        }

        /* Content Section */
        .content-section {
            padding: 40px 30px;
        }

        .content-section p {
            font-size: 16px;
            color: #c1cce0;
        }

        /* CTA Button */
        .cta-button {
            display: inline-block;
            padding: 16px 32px;
            margin-top: 30px;
            background: linear-gradient(45deg, #007bff, #0056b3);
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            letter-spacing: 0.5px;
            box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
            transition: all 0.3s ease;
        }
        
        .cta-button:hover {
            box-shadow: 0 12px 30px rgba(0, 123, 255, 0.5);
        }

        /* Feature Grid */
        .feature-grid {
            display: table;
            width: 100%;
            margin-top: 40px;
        }

        .feature-cell {
            display: table-cell;
            width: 50%;
            padding: 10px;
            vertical-align: top;
        }

        .feature-item {
            background-color: #1a2233;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            border: 1px solid #2a3449;
        }

        .feature-icon {
            font-size: 28px;
            margin-bottom: 10px;
            color: #00b3ff;
            text-shadow: 0 0 10px rgba(0, 179, 255, 0.4);
        }

        .feature-item h3 {
            margin: 0 0 5px;
            font-size: 16px;
            font-weight: 600;
            color: #aebfd5;
        }

        .feature-item p {
            font-size: 14px;
            color: #8c9cb5;
            margin: 0;
        }

        /* Footer Section */
        .footer-section {
            background-color: #1a2233;
            padding: 25px 30px;
            text-align: center;
            font-size: 13px;
            color: #6a7c98;
            border-top: 1px solid #2a3449;
        }

        .footer-section a {
            color: #8c9cb5;
            text-decoration: none;
            margin: 0 8px;
            transition: color 0.3s ease;
        }
        
        .footer-section a:hover {
            color: #d1e4ff;
        }

        /* Responsive Styles */
        @media only screen and (max-width: 600px) {
            .email-wrapper {
                border-radius: 0;
                width: 100% !important;
            }

            .hero-section {
                padding: 40px 20px;
            }

            .hero-section h1 {
                font-size: 28px;
            }

            .content-section {
                padding: 30px 20px;
            }

            .feature-cell {
                display: block;
                width: 100% !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0;">
    <center>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0d121c;">
            <tr>
                <td align="center" valign="top">
                    <table class="email-wrapper" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td class="hero-section" align="center" valign="top">
                                <div class="hero-bg">
                                    <span class="ai">🤖</span>
                                    <span class="reason">🧠</span>
                                    <span class="chat">💬</span>
                                    <span class="output">📈</span>
                                    <span class="ship">🚀</span>
                                    <span class="iot">🔌</span>
                                </div>
                                <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 15px;">Welcome to [Brand Name] 🚀</h1>
                                <p style="font-size: 16px; max-width: 450px; margin: 0 auto; color: #aebfd5;">Your journey to enhanced productivity and intelligent solutions begins now. We're excited to have you on board!</p>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="content-section" align="left" valign="top">
                                <p style="font-size: 16px; color: #e0e6f2; margin-bottom: 25px;">
                                    Hi there,
                                </p>
                                <p style="font-size: 16px; color: #aebfd5; margin-bottom: 25px;">
                                    Our platform provides a unified space for intermediate developers to access AI-powered tools in domains like **Cybersecurity, MERN stack, Web Development, Data Science, Machine Learning, and Python** — designed to boost productivity and speed up your workflow.
                                </p>

                                <p style="text-align: center; margin-top: 30px;">
                                    <a href="#" class="cta-button" style="display: inline-block; padding: 16px 32px; background: linear-gradient(45deg, #007bff, #0056b3); color: white; text-decoration: none; border-radius: 50px; font-weight: 600; letter-spacing: 0.5px; box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);">
                                        Explore Tools Now
                                    </a>
                                </p>

                                <div style="text-align: center; margin: 40px 0;">
                                    <hr style="border: none; height: 1px; background-color: #2a3449; margin: 0; display: inline-block; width: 50%;">
                                </div>
                                
                                <h2 style="font-size: 24px; font-weight: 600; color: #d1e4ff; margin-bottom: 20px; text-align: center;">Why Developers Trust Us</h2>

                                <table class="feature-grid" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td class="feature-cell" align="center" valign="top">
                                            <div class="feature-item">
                                                <div class="feature-icon">⚡</div>
                                                <h3>Faster Development</h3>
                                                <p>Automate repetitive tasks and accelerate your workflow.</p>
                                            </div>
                                        </td>
                                        <td class="feature-cell" align="center" valign="top">
                                            <div class="feature-item">
                                                <div class="feature-icon">🧠</div>
                                                <h3>Smarter Productivity</h3>
                                                <p>Access intelligent tools that learn and adapt to your needs.</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="feature-cell" align="center" valign="top">
                                            <div class="feature-item">
                                                <div class="feature-icon">🌐</div>
                                                <h3>Wide Tech Stacks</h3>
                                                <p>Solutions tailored for a variety of popular development stacks.</p>
                                            </div>
                                        </td>
                                        <td class="feature-cell" align="center" valign="top">
                                            <div class="feature-item">
                                                <div class="feature-icon">🔒</div>
                                                <h3>Secure AI Tools</h3>
                                                <p>Your data and privacy are our top priority with secure AI.</p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td class="footer-section" align="center" valign="top">
                                <p style="margin: 0 0 10px;">
                                    <a href="#" style="color: #8c9cb5;">LinkedIn</a> |
                                    <a href="#" style="color: #8c9cb5;">Twitter</a> |
                                    <a href="#" style="color: #8c9cb5;">GitHub</a>
                                </p>
                                <p style="margin: 0;">
                                    Need help? Contact us at <a href="mailto:support@brandname.com" style="color: #8c9cb5;">support@brandname.com</a>
                                </p>
                                <p style="margin-top: 15px;">
                                    &copy; 2024 [Brand Name]. All Rights Reserved.
                                </p>
                                <p style="margin-top: 10px;">
                                    <a href="#" style="color: #6a7c98; font-size: 12px;">Unsubscribe</a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
`
export { html_doc ,html_doc_pdf };
