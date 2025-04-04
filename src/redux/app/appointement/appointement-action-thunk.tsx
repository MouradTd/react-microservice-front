import {appointementService} from '@/api';
import {AppThunk} from '@/redux/store';
import { editAppointement, pushAppointement, removeAppointement, setAppointements, setPatient } from './appointement-slice';

class AppointementActionThunk {
  getPatientAppointements(id:number): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await appointementService.getPatientAppointements(id);
        if (res) {
          dispatch(setPatient(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  getAppointements(): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await appointementService.getAppointements();
        if (res) {
          dispatch(setAppointements(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  EditAppointement(data:any,id:number):AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await appointementService.EditAppointement(data,id);
        if (res) {
          dispatch(editAppointement(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  AddAppointement(data:any):AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await appointementService.AddAppointement(data);
        if (res) {
          dispatch(pushAppointement(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  deleteAppointement(id:number){
    return async (dispatch, state) => {
      try {
        const res = await appointementService.deleteAppointement(id);
        if (res?.status === 200) {
          dispatch(removeAppointement(id)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  passedAppointement(id:number){
    return async (dispatch, state) => {
      try {
        const res = await appointementService.passedAppointement(id);
        if (res?.status === 200) {
          dispatch(editAppointement(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  
}

export const appointementActionThunk = new AppointementActionThunk();
