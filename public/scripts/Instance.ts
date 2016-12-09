module ExpressChat {
    declare var io: { connect(url: string): Socket; }

    export class Instance {
        socket: Socket;
        profile: Models.IProfile;
        foundProfile: Models.IProfile;
        recipient: Models.IProfile;
        rooms: Models.IPrivateRoom[];
        requests: Models.IRequest[];
        pendings: Models.IRequest[];
        notifications: Models.INotification[];

        constructor($scope: any, userId: number, url: string, notifier: any) {
            this.socket = io.connect(url);
            this.socket.emit('initialize', userId);
            this.notifications = [];

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

            this.socket.on('get notifications', (notifications: any[]) => {
                $scope.$apply(() => {
                    this.notifications = [];

                    notifications.forEach(notification => {
                        this.notifications.push(new Models.Notification(notification));
                    });
                });
            });

            this.socket.on('get search profile', (profile: any) => {
                $scope.$apply(() => {
                    this.foundProfile = new Models.Profile(profile);
                });
            });

            this.socket.on('get recipient', (profile: any) => {
                $scope.$apply(() => {
                    this.recipient = new Models.Profile(profile);
                });
            });

            this.socket.on('notify', (notification: any) => {
                $scope.$apply(() => {
                    notifier.success('You got new notification');
                });
            });
        }
    }
}