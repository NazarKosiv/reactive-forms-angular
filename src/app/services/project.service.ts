export class ProjectService {
  private takenProjectEmails: string[] = ['test@test', 'test@mail.com', 'project@test.com'];

  checkEmail(name: string): Promise<any> {
    return new Promise<any>(resolve => {
      setTimeout(() => {
        if (this.takenProjectEmails.includes(name)) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }
}
