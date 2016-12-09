var ExpressChat;
(function (ExpressChat) {
    var Services;
    (function (Services) {
        class User {
            static Register(data) {
                return ExpressChat.http.post(ExpressChat.service + 'user/register', JSON.stringify(data));
            }
            static InitialUpload(folder, data) {
                return ExpressChat.http.post(ExpressChat.service + 'user/initialUpload?folder=' + folder, data, { headers: { 'Content-Type': undefined } });
            }
            static ProfileUpload(folder, data) {
                return ExpressChat.http.post(ExpressChat.service + 'user/ProfileUpload?folder=' + folder, data, { headers: { 'Content-Type': undefined } });
            }
            static Login(data) {
                return ExpressChat.http.post(ExpressChat.service + 'user/authenticate', JSON.stringify(data));
            }
            static Logout() {
                return ExpressChat.http.get(ExpressChat.service + 'user/logout');
            }
            static UpdateProfile(data) {
                return ExpressChat.http.post(ExpressChat.service + 'profile/save', JSON.stringify(data));
            }
        }
        Services.User = User;
    })(Services = ExpressChat.Services || (ExpressChat.Services = {}));
})(ExpressChat || (ExpressChat = {}));
//# sourceMappingURL=Services.js.map