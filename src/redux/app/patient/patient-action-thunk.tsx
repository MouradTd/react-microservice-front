import {patientService} from '@/api';
import {AppThunk} from '@/redux/store';
import { setPatients,addPatient } from './patient-slice';

class PatientActionThunk {
  getPatients(): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await patientService.getAllpatients();
        if (res) {
          dispatch(setPatients(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  AddPatient(data:any): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await patientService.AddPatient(data);
        if (res) {
          dispatch(addPatient(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
}

export const patientActionThunk = new PatientActionThunk();
