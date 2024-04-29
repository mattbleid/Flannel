import React from "react";

function Resources() {
  return (
    <>
      <style>
        {`
          .container {
            max-width: 960px;
            margin: auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }

          h1, h2 {
            color: rgb(207, 6, 6);
          }

          .resource-section {
            margin-bottom: 20px;
          }

          .resource-section h2 {
            margin-top: 20px;
          }

          .resource-section p {
            font-size: 16px;
            line-height: 1.6;
            color: #333;
          }

          a {
            color: rgb(207, 6, 6);
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }

          footer {
            margin-top: 40px;
            color: #666;
          }

          footer a {
            color: rgb(207, 6, 6);
          }

          footer a:hover {
            text-decoration: underline;
          }
        `}
      </style>
      <div className="container">
        <h1>Mental Health Resources</h1>
        <div className="resource-section">
          <h2>Understanding Mental Health</h2>
          <p>
            Mental health includes our emotional, psychological, and social
            well-being. It affects how we think, feel, and act as we cope with
            life. Learn more about mental health and how to improve it.
          </p>
          <a
            href="https://www.mentalhealth.gov/basics/what-is-mental-health"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
        <div className="resource-section">
          <h2>Help for Mental Illnesses</h2>
          <p>
            If you or someone you know has a mental illness, there are many
            resources to get help. Use these resources to find help you, a
            friend, or a family member.
          </p>
          <a
            href="https://www.nimh.nih.gov/health/find-help"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find Help
          </a>
        </div>
        <div className="resource-section">
          <h2>Immediate Help</h2>
          <p>
            If you are in crisis and need immediate support or intervention,
            call, or go to the emergency room of the nearest hospital.
          </p>
          <a
            href="https://suicidepreventionlifeline.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Suicide Prevention Lifeline
          </a>
        </div>
        <footer>
          <p>
            For more information on mental health, please visit{" "}
            <a
              href="https://www.mentalhealthfirstaid.org/mental-health-resources/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mental Health First Aid
            </a>
            .
          </p>
        </footer>
      </div>
    </>
  );
}

export default Resources;
