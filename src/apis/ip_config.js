const IP = 'http://95.179.252.22:3003/api/v1';

module.exports.URL_LOGIN_WITH_PASS = `${IP}/auth/login`;
module.exports.URL_SIGNUP= `${IP}/auth/register`;
module.exports.URL_GET_USER_INFO = `${IP}/user/profile`;
module.exports.URL_PROJECT = `${IP}/project`;
module.exports.URL_UPLOAD = `${IP}/upload/img`;
module.exports.URL_VERIFY_EMAIL = `${IP}/auth/verifyEmail`;
module.exports.URL_FORGOT_PASS = `${IP}/auth/forgot_password`;
module.exports.URL_RESET_PASS = `${IP}/auth/change_password`;
module.exports.URL_TIMEZONE = `${IP}/timezone`;
module.exports.URL_VERIFY_RESET_MAIL = `${IP}/auth/checkValidResetPassword`