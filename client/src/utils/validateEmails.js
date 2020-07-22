const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
    const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => reg.test(email) === false)
    //use filter to check if it's valid email address:return the email fail the test

    if (invalidEmails.length) {
        return `These emails are invalid: ${ invalidEmails }`;
    }

    return;
};
