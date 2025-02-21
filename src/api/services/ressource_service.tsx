import { client } from '@/api/common';

class RessourceService {
    private URI = '/ressource/';

    async getSalles(){
        try {
            const res = await client.get(this.URI+'salle/get');
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async editSalle(data:any,id:number){
        try {
            const res = await client.put(this.URI+'salle/update/'+id,data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async AddSalle(data:any){
        try {
            const res = await client.post(this.URI+'salle/insert',data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async deleteSalle(id:number){
        try {
            const res = await client.delete(this.URI+'salle/delete/'+id);
            return res;
        } catch (e) {
            console.log(e);
        }
    }


    async getProducts(){
        try {
            const res = await client.get(this.URI+'product/get');
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async AddProduct(data:any){
        try {
            const res = await client.post(this.URI+'product/create',data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async EditProduct(data:any,id:number){
        try {
            const res = await client.put(this.URI+'product/update/'+id,data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async deleteProduct(id:number){
        try {
            const res = await client.delete(this.URI+'product/delete/'+id);
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    // consumption

    async AddDemande(data:any){
        try {
            const res = await client.post(this.URI+'product/usage/create',data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async getDemande(){
        try {
            const res = await client.get(this.URI+'product/usage/get');
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async EditDemande(data:any,id:any){
        try {
            const res = await client.put(this.URI+'product/usage/update/'+id,data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async validateDemande(id:any){
        try {
            const res = await client.post(this.URI+'product/usage/validate/'+id);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async deleteDemande(id:any){
        try {
            const res = await client.delete(this.URI+'product/usage/delete/'+id);
            return res;
        } catch (e) {
            console.log(e);
        }
    }

}

export const ressourceService = new RessourceService();
