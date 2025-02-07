import {appointementService} from '@/api';
import {AppThunk} from '@/redux/store';
import { setPatient } from './appointement-slice';

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
  
}

export const appointementActionThunk = new AppointementActionThunk();
