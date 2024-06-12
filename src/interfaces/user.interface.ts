export interface User{
    id: string;
    name: string;
    CPF: string
    email: string
    phone: string
    lastGPSLocation: string
    allowSMS: string
    workAddress: string
    homeAddress: string
    neighborhood: string
    houseNumber: number
    hasHealthPlan: string
    birthdate: Date
    gender: string
    status: string
    activeAccount: boolean
    createdAt: Date
    lastUpdate: Date
};