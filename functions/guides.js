exports.handler = async (event, context) => {

  const guides = [
    { title: "Beat all Zelda Bosses like a boss", author: "mario" },
    { title: "Mario kart shortcut you never knew Existed", author: "luigi" },
    { title: "Ultimate Street Fighter Guide", author: "chung lu" }
  ];

  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(guides)
    }
  }

  return {
    statusCode: 401,
    body: JSON.stringify({
      mssg: 'ah, ah, ah you must logged in to see this'
    })
  }

}
