module ExpressChat {
    declare var io: { connect(url: string): Socket; }

    export class Instance {
        socket: Socket;
        profile: Models.IProfile;
        foundProfile: Models.IProfile;
        rooms: Models.IPrivateRoom[];

        constructor($scope: any, userId: number, url: string) {
            this.socket = io.connect(url);
            this.socket.emit('initialize', userId);

            this.socket.on('get profile', (profile: any) => {
                $scope.$apply(() => {
                    this.profile = new Models.Profile(profile);
                });
            });

            this.socket.on('get rooms', (rooms: any[]) => {
                $scope.$apply(() => {
                    this.rooms = [];

                    rooms.forEach(room => {
                        this.rooms.push(new Models.PrivateRoom(room));
                    });
                });
            });

            this.socket.on('get search profile', (profile: any) => {
                $scope.$apply(() => {
                    this.foundProfile = new Models.Profile(profile);
                });
            });
        }
    }
}