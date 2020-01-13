// module.exports = {
//     googleClientID: "1025236148426-mrdofro05epnm7t2038els5ucctaac1n.apps.googleusercontent.com",
//     googleClientSecret: "WmYAlmGaWVHLigqaEtUR2U6z",
//     mongoURI: "mongodb+srv://chalkboy:LS8YwV!gWiA+32$@emailyy-prod-cluster-t57f6.mongodb.net/test?retryWrites=true&w=majority",
//     cookieKey: "asdnaskdnoqdaksldmsldml"
// }


module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY
}