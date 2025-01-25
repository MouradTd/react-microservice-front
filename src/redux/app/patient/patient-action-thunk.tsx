import {patientService} from '@/api';
import {AppThunk} from '@/redux/store';
import { setPatients,addPatient, editPatient, removePatient } from './patient-slice';

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
  EditPatient(data:any,id:any): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await patientService.EditPatient(id,data);
        if (res) {
          dispatch(editPatient(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  deletePatient(id:any): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await patientService.deletePatient(id);
        if (res?.status === 200) {
          dispatch(removePatient(id)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
}

export const patientActionThunk = new PatientActionThunk();
