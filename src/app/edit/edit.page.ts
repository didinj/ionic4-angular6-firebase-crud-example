import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  ref = firebase.database().ref('infos/');
  infoForm: FormGroup;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
      this.infoForm = this.formBuilder.group({
        'info_title' : [null, Validators.required],
        'info_description' : [null, Validators.required]
      });
      this.getInfo(this.route.snapshot.paramMap.get('key'));
    }

  ngOnInit() {
  }

  getInfo(key) {
    firebase.database().ref('infos/'+key).on('value', resp => {
      let info = snapshotToObject(resp);
      this.infoForm.controls['info_title'].setValue(info.info_title);
      this.infoForm.controls['info_description'].setValue(info.info_description);
    });
  }

  updateInfo() {
    let newInfo = firebase.database().ref('infos/'+this.route.snapshot.paramMap.get('key')).update(this.infoForm.value);
    this.router.navigate(['/detail/'+this.route.snapshot.paramMap.get('key')]);
  }

}

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}
