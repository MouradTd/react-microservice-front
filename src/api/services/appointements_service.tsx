import { client } from '@/api/common';

class AppoinyementService {
    private URI = '/patient/';

    async getPatientAppointements(id:number) {
        try {
            const res = await client.get(this.URI+'appointements/'+id);
            return res;
        } catch (e) {
            console.log(e);
        }
    }

}
export const appointementService = new AppoinyementService();

