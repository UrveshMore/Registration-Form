import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

// Declare bootstrap to avoid TypeScript error
declare var bootstrap: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  searchData = '';
  filteredData: any[] = [];
  registrationForm: FormGroup;
  filteredStates: [] = [];
  filteredCities: [] = [];

  countries = ['USA', 'Canada', 'India', 'Germany'];
  states = {
    USA: ['California', 'Texas', 'Florida', 'Illinois'],
    Canada: ['Ontario', 'Quebec', 'Alberta', 'Manitoba'],
    India: ['Maharashtra', 'Karnataka', 'Gujarat', 'WestBengal'],
    Germany: ['Bavaria', 'Berlin', 'Saxony'],
  };

  cities = {
    California: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
    Texas: ['Houston', 'Dallas', 'Austin', 'San Antonio'],
    Florida: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
    Illinois: ['Chicago', 'Springfield', 'Naperville', 'Peoria'],
    Ontario: ['Toronto', 'Ottawa', 'Hamilton', 'Kitchener'],
    Quebec: ['Montreal', 'Quebec City', 'Laval', 'Gatineau'],
    Alberta: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
    Manitoba: ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson'],
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'malegoan'],
    Karnataka: ['Bangalore', 'Mysore', 'Mangalore', 'Hubli'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    WestBengal: ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'],
    Bavaria: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg'],
    Berlin: ['Berlin'],
    Saxony: ['Dresden', 'Leipzig', 'Chemnitz', 'Zwickau'],
  };


  selectedIndex: number;
  @ViewChild('editModal') editModalElement: ElementRef;
  constructor(private fb: FormBuilder, public sharedService: SharedService) {
    this.registrationForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      gender: ['',Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      designation: ['',Validators.required],
      dob: ['',Validators.required],
      age: [''],
      photo: ['',Validators.required],
      country: ['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
    });

    this.registrationForm.get('dob').valueChanges.subscribe(value => {
      if (value) {
        const age = this.calculateAge(new Date(value));
        this.registrationForm.get('age').setValue(age);
        console.log("ageee111=>>",this.registrationForm.value.age);
        // console.log("agee===>>",age);
      }
    });

    this.registrationForm.get('country').valueChanges.subscribe(value => {
      this.filteredStates = this.states[value];
      // console.log("filteredStates==>>",this.filteredStates);
      this.filteredCities = [];
      this.registrationForm.get('state').setValue('');
      this.registrationForm.get('city').setValue('');
    });

    this.registrationForm.get('state').valueChanges.subscribe(value => {
      this.filteredCities = this.cities[value];
      console.log("filteredCities=====>",this.filteredCities)
      this.registrationForm.get('city').setValue('');
    });
  }

  ngOnInit(): void {
    this.filteredData = this.sharedService.formDataArray;
  }

  calculateAge(dob: Date): number {
    const diff = Date.now() - dob.getTime();
    const ageDt = new Date(diff);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }


  saveData() {
    console.log("this.registrationForm.value===>>", this.registrationForm.value);
    this.sharedService.formDataArray.push(this.registrationForm.value)
    this.sharedService.registrationData.next(this.registrationForm.value)

    // this.data.push(this.registrationForm.value);
    console.log("submited data", this.sharedService.formDataArray)
    this.registrationForm.reset();

  }

  editRecord(index) {
    this.selectedIndex = index;
    const selectedItem = this.sharedService.formDataArray[index];
    const formValues = {
      firstName: selectedItem.firstName,
      lastName: selectedItem.lastName,
      gender: selectedItem.gender,
      contactNumber: selectedItem.contactNumber,
      email: selectedItem.email,
      designation: selectedItem.designation,
      dob: selectedItem.dob,
      age: selectedItem.age,
      photo: '',
      country: selectedItem.country,
      state: selectedItem.state,
      city: selectedItem.city,
      pincode: selectedItem.pincode
    };

    this.registrationForm.setValue(formValues);
    this.selectedIndex = index;
  }

  filterData() {
    this.filteredData = this.sharedService.formDataArray.filter(data => {
      console.log("searchData",data);
      return Object.values(data).some(value =>
        String(value).toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
  }

  updateRegistrationData() {
    console.log("this.selectedIndex", this.selectedIndex);
    this.sharedService.formDataArray[this.selectedIndex] = this.registrationForm.value;
    this.closeModal();
  }
  closeModal() {
    const modalElement = this.editModalElement.nativeElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
}
