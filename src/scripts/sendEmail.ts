interface Email {
  name: string;
  email: string;
  title: string;
  body: string;
}

/**
 * - send an email to email server
 * @param {Email} email - email object
 * @returns {boolean} - boolean, successful or not
 */
export async function sendEmail(email: Email): Promise<boolean> {
  const response = await fetch(
    "https://email-server-spencerhemstreet.herokuapp.com/api/v1/contactFormEmail",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: email.name,
        email: email.email,
        title: email.title,
        body: email.body,
      }),
    }
  ).catch((error) => {
    // failed to fetch
    // console.log('Yikes, fetch error!', error)
  });

  if (!response) return false;

  // Try to get JSON from response
  try {
    const res: { Success: boolean } = await response.clone().json()
    return res.Success;
  } catch (err) {
    // Try text instead of JSON
    const res = await response.clone().text().catch(err => {
      // console.log("Failed to read response.", err)
    });
    return res === "Success"
  }
}