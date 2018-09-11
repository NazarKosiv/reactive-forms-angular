import { Component, OnInit } from '@angular/core';
import { ProjectStatus } from './shared/models/project-status.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public projectStatuses: ProjectStatus[] = [
    new ProjectStatus('Stable', 'stable'),
    new ProjectStatus('Critical', 'critical'),
    new ProjectStatus('Finished', 'finished')
  ];
  public forbiddenProjectNames: string[] = ['test', 'guest'];
  public projectForm: FormGroup;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.projectForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), this.projectNameValidator.bind(this)]),
      email: new FormControl(null, [Validators.required, Validators.email], this.projectEmailAsyncValidator.bind(this)),
      status: new FormControl('stable', [Validators.required, Validators.minLength(2)]),
    });
  }

  private projectNameValidator(control: FormControl): any {
    if (this.forbiddenProjectNames.includes(control.value)) {
      return { forbiddenName: true };
    } else {
      return null;
    }
  }

  private projectEmailAsyncValidator(control: FormControl): Promise<any> | Observable<any> {
    return this.projectService.checkEmail(control.value).then((isTaken: boolean) => {
      if (isTaken) {
        return {
          emailTaken: true
        };
      } else {
        return null;
      }
    });
  }

  public onSubmit(): void {
    console.log(this.projectForm.value);
  }
}
