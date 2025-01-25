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
}
export const patientService = new PatientService();

