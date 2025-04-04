import {patientService} from '@/api';
import {AppThunk} from '@/redux/store';
import { setPatients,addPatient, editPatient, removePatient, selectPatient } from './patient-slice';
import { addDocumentModal, removeDocument } from '../appointement';

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
  getPatient(id:any): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await patientService.getPatient(id);
        if (res) {
          dispatch(selectPatient(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }

  deleteDocument(id:any): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await patientService.deleteDocument(id);
        if (res?.status === 200) {
          dispatch(removeDocument(id)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }

  uploadDocument(id:number,data:any): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await patientService.uploadDocument(id,data);
        if (res?.status === 201) {
          dispatch(addDocumentModal(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
}

export const patientActionThunk = new PatientActionThunk();
