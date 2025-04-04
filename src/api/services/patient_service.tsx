import { client } from '@/api/common';

class PatientService {
    private URI = '/patient/';

    async getAllpatients() {
        try {
            const res = await client.get(this.URI);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async AddPatient(data:any) {
        try {
            const res = await client.post(this.URI,data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async EditPatient(id:any,data:any) {
        try {
            const res = await client.put(this.URI+id,data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async deletePatient(id:any) {
        try {
            const res = await client.delete(this.URI+id);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async getPatient(id:any) {
        try {
            const res = await client.get(this.URI+id);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async deleteDocument(id:any) {
        try {
            const res = await client.delete('/documents/'+id);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    async uploadDocument(id:number,data:any) {
        try {
            const res = await client.post('/documents/'+id,data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
}
export const patientService = new PatientService();

