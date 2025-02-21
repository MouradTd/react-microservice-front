import { client } from '@/api/common';

class AppoinyementService {
    private URI = '/appointment/';

    async getPatientAppointements(id:number) {
        try {
            const res = await client.get('/patient/appointements/'+id);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async getAppointements(){
        try {
            const res = await client.get(this.URI);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async EditAppointement(data:any,id:number){
        try {
            const res = await client.put(this.URI+id,data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async AddAppointement(data:any){
        try {
            const res = await client.post(this.URI,data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async deleteAppointement(id:number){
        try {
            const res = await client.delete(this.URI+id);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async passedAppointement(id:number){
        try {
            const res = await client.post(this.URI+'validate/'+id);
            return res;
        } catch (e) {
            console.log(e);
        }
    }

}
export const appointementService = new AppoinyementService();

