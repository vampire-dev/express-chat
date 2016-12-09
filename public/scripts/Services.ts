module ExpressChat.Services {
    export class User {
        static Register(data: any) {
            return http.post(service + 'user/register', JSON.stringify(data));
        }

        static InitialUpload(folder: any, data: any) {
            return http.post(service + 'user/initialUpload?folder=' + folder, data, { headers: { 'Content-Type': undefined } });
        }

        static ProfileUpload(folder: any, data: any) {
            return http.post(service + 'user/ProfileUpload?folder=' + folder, data, { headers: { 'Content-Type': undefined } });
        }

        static Login(data: any) {
            return http.post(service + 'user/authenticate', JSON.stringify(data));
        }

        static Logout() {
            return http.get(service + 'user/logout');
        }
    }
}