import React, { useState } from "react";

function Resources() {
  const [isOpen, setIsOpen] = useState({
    generalResources: false,
    depression: false,
    selfInjury: false,
    anxiety: false,
    psychosis: false,
    substanceUse: false,
    eatingDisorders: false,
    helpLines: false,
    supportGroups: false,
  });

  const toggleDropdown = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

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
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .resource-section p {
            font-size: 16px;
            line-height: 1.6;
            color: #333;
          }
          .resource-section ul {
            margin-top: 10px;
            padding-left: 20px;
          }
          .resource-section li {
            margin-bottom: 5px;
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
          .dropdown-icon {
            font-size: 20px;
            transition: transform 0.3s;
          }
          .open .dropdown-icon {
            transform: rotate(180deg);
          }
        `}
      </style>
      <div className="container">
        <h1>Mental Health Resources</h1>
        <div className="resource-section">
          <h2 onClick={() => toggleDropdown("generalResources")}>
            General Mental Health Resources
            <span
              className={`dropdown-icon ${
                isOpen.generalResources ? "open" : ""
              }`}
            >
              &#9662;
            </span>
          </h2>
          {isOpen.generalResources && (
            <div>
              <ul>
                <li>
                  <a
                    href="http://www.mentalhealthamerica.net"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mental Health America
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.thenationalcouncil.org/providers/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    National Council for Mental Wellbeing - Find a Provider
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.power2u.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    National Empowerment Center
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.nimh.nih.gov/health/statistics/prevalence/any-mental-illness-ami-among-us-adults.shtml"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    National Institute of Mental Health (Mental Illness Among
                    U.S. Adults)
                  </a>
                </li>
                <li>
                  <a
                    href="http://govinfo.library.unt.edu/mentalhealthcommission/reports/reports.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    President's New Freedom Commission on Mental Health
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.who.int/topics/global_burden_of_disease/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    World Health Organization (Disability from Mental Illness)
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.nami.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    National Alliance on Mental Illness
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="resource-section">
          <h2 onClick={() => toggleDropdown("depression")}>
            Depression and Suicidal Intentions
            <span
              className={`dropdown-icon ${isOpen.depression ? "open" : ""}`}
            >
              &#9662;
            </span>
          </h2>
          {isOpen.depression && (
            <div>
              <ul>
                <li>
                  <a
                    href="http://www.suicidology.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    American Association of Suicidology
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.afsp.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    American Foundation for Suicide Prevention
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.bbrfoundation.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Brain &amp; Behavior Research Foundation
                  </a>
                </li>
                <li>
                  <a
                    href="http://mentalhealthamerica.net/mental-health-screening-tools"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mental Health America - Screening Tools
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.depression-screening.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Depression Screening
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.moodgym.anu.edu.au"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MoodGYM
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.postpartum.net"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Postpartum Support International
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.hws.edu/studentlife/counseling_relax.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Progressive Relaxation
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.sprc.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Suicide Prevention Resource Center
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="resource-section">
          <h2 onClick={() => toggleDropdown("selfInjury")}>
            Nonsuicidal Self-Injury
            <span
              className={`dropdown-icon ${isOpen.selfInjury ? "open" : ""}`}
            >
              &#9662;
            </span>
          </h2>
          {isOpen.selfInjury && (
            <div>
              <ul>
                <li>
                  <a
                    href="http://www.focusas.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Focus Adolescent Services
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.selfinjury.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    S.A.F.E. Alternatives (Self-Abuse Finally Ends)
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="resource-section">
          <h2 onClick={() => toggleDropdown("anxiety")}>
            Anxiety Disorders
            <span className={`dropdown-icon ${isOpen.anxiety ? "open" : ""}`}>
              &#9662;
            </span>
          </h2>
          {isOpen.anxiety && (
            <div>
              <ul>
                <li>
                  <a
                    href="http://www.adaa.org/understanding-anxiety/panic-disorder-agoraphobia/symptoms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Anxiety and Depression Association of America (ADAA)
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.massgeneral.org/bhi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Benson-Henry Institute for Mind Body Medicine
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.ecouch.anu.edu.au"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    E-couch
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.freedomfromfear.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Freedom From Fear
                  </a>
                </li>
                <li>
                  <a
                    href="https://iocdf.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    International OCD Foundation
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="resource-section">
          <h2 onClick={() => toggleDropdown("psychosis")}>
            Psychosis and Psychotic Disorders
            <span className={`dropdown-icon ${isOpen.psychosis ? "open" : ""}`}>
              &#9662;
            </span>
          </h2>
          {isOpen.psychosis && (
            <div>
              <ul>
                <li>
                  <a
                    href="https://bbrfoundation.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Brain &amp; Behavior Research Foundation
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.pendulum.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pendulum
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.schizophrenia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schizophrenia.com
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="resource-section">
          <h2 onClick={() => toggleDropdown("substanceUse")}>
            Substance Use Disorders
            <span
              className={`dropdown-icon ${isOpen.substanceUse ? "open" : ""}`}
            >
              &#9662;
            </span>
          </h2>
          {isOpen.substanceUse && (
            <div>
              <ul>
                <li>
                  <a
                    href="http://www.smokefree.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Centers for Disease Control and Prevention (Smokefree.gov)
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.ncadd.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    National Council on Alcoholism and Drug Dependence, Inc.
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.niaaa.nih.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    National Institute on Alcohol Abuse and Alcoholism
                  </a>
                </li>
                <li>
                  <a
                    href="https://startyourrecovery.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Your Recovery
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.nida.nih.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    National Institute on Drug Abuse (NIDA)
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.SAMHSA.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Substance Abuse and Mental Health Services Administration
                    (SAMHSA)
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.drugscreening.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DrugScreening.org
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.alcoholscreening.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AlcoholScreening.org
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="resource-section">
          <h2 onClick={() => toggleDropdown("eatingDisorders")}>
            Eating Disorders
            <span
              className={`dropdown-icon ${
                isOpen.eatingDisorders ? "open" : ""
              }`}
            >
              &#9662;
            </span>
          </h2>
          {isOpen.eatingDisorders && (
            <div>
              <ul>
                <li>
                  <a
                    href="http://www.anad.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    National Association of Anorexia Nervosa and Associated
                    Disorders (ANAD)
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.nationaleatingdisorders.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    National Eating Disorders Association
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.NIMH.NIH.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    National Institute of Mental Health (NIMH)
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="resource-section">
          <h2 onClick={() => toggleDropdown("supportGroups")}>
            Support Groups
            <span
              className={`dropdown-icon ${isOpen.supportGroups ? "open" : ""}`}
            >
              &#9662;
            </span>
          </h2>
          {isOpen.supportGroups && (
            <div>
              <ul>
                <li>
                  <a
                    href="http://www.al-anon.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Al-Anon
                  </a>{" "}
                  and{" "}
                  <a
                    href="http://www.alateen.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Alateen
                  </a>{" "}
                  provide information and support for the family members and
                  friends of people with alcohol problems. The sites include
                  lists of meetings in the United States and Canada.
                </li>
                <li>
                  <a
                    href="http://www.mentalhelp.net/selfhelp/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    American Self-Help Group Clearinghouse
                  </a>{" "}
                  is a keyword-searchable database of 1,100 national,
                  international, model and online self-help support groups. Also
                  listed are self-help clearinghouses worldwide, research
                  studies, information on starting face-to-face and online
                  groups and a registry for persons interested in starting
                  national or international self-help groups.
                </li>
                <li>
                  Use the{" "}
                  <a
                    href="http://www.dbsalliance.org/site/PageServer?pagename=peer_support_group_locator"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    "Find a Support Group Near You"
                  </a>{" "}
                  tool on the Depression and Bipolar Support Alliance website to
                  find out if a support group is meeting in your area. These are
                  peer-led support groups.
                </li>
                <li>
                  Following the 12-step approach used by Alcoholics Anonymous,{" "}
                  <a
                    href="http://www.eatingdisordersanonymous.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Eating Disorders Anonymous
                  </a>{" "}
                  can help people struggling with eating disorders. The website
                  lists meetings nationwide.
                </li>
                <li>
                  <a
                    href="http://www.na.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Narcotics Anonymous
                  </a>{" "}
                  and{" "}
                  <a
                    href="http://www.aa.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Alcoholics Anonymous
                  </a>{" "}
                  include information on support groups for drug and alcohol
                  addiction in your area.
                </li>
                <li>
                  Following the 12-step approach used by Alcoholics Anonymous,{" "}
                  <a
                    href="http://www.oa.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Overeaters Anonymous
                  </a>{" "}
                  can help people struggling with compulsive eating and binge
                  eating. The website lists Overeaters Anonymous meetings
                  nationwide.
                </li>
                <li>
                  Recovery International, a self-help mental health
                  organization, sponsors weekly group peer-led meetings in many
                  communities, as well as telephone and Internet-based meetings.
                  Click "
                  <a
                    href="https://www.recoveryinternational.org/meetings/find-a-meeting/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Find a Meeting
                  </a>
                  " to find the next Recovery International meeting in your
                  area.
                </li>
                <li>
                  <a
                    href="http://www.sardaa.org/schizophrenics-anonymous/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schizophrenics Anonymous
                  </a>{" "}
                  is comprised of self-help groups established to support the
                  recovery of people who experience schizophrenia. The website
                  lists locations of self-help groups.
                </li>
              </ul>
            </div>
          )}
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
