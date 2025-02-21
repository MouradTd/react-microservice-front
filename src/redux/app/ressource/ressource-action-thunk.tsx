import {ressourceService} from '@/api';
import {AppThunk} from '@/redux/store';
import { editDemande, editProduct, editSalle, pushDemande, pushProduct, pushSalle, removeDemande, removeProduct, removeSalle, setDemande, setProduct, setSalle } from './ressource-slice';

class RessourceActionThunk {
  getSalles(): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.getSalles();
        if (res) {
          dispatch(setSalle(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  editSalle(data:any,id:number): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.editSalle(data,id);
        if (res) {
          dispatch(editSalle(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  AddSalle(data:any): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.AddSalle(data);
        if (res) {
          dispatch(pushSalle(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  deleteSalle(id:number): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.deleteSalle(id);
        if (res) {
          dispatch(removeSalle(id)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }

  getProducts(): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.getProducts();
        if (res) {
          dispatch(setProduct(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }

  AddProduct(data:any): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.AddProduct(data);
        if (res) {
          dispatch(pushProduct(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  EditProduct(data:any,id:number): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.EditProduct(data,id);
        if (res) {
          dispatch(editProduct(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  deleteProduct(id:number): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.deleteProduct(id);
        if (res) {
          dispatch(removeProduct(id)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }


  AddDemande(data:any): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.AddDemande(data);
        if (res) {
          dispatch(pushDemande(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  getDemande(): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.getDemande();
        if (res) {
          dispatch(setDemande(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  EditDemande(data:any,id:any): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.EditDemande(data,id);
        if (res) {
          dispatch(editDemande(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  validateDemande(id:any): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.validateDemande(id);
        if (res) {
          dispatch(editDemande(res.data)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  deleteDemande(id:any): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await ressourceService.deleteDemande(id);
        if (res) {
          dispatch(removeDemande(id)); // Dispatch the action with the data
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  
}

export const ressourceActionThunk = new RessourceActionThunk();
