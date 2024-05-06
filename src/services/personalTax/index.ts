export const calulateTaxRate = (tntt: number) => {
    if(tntt <= 5000000) {
        return tntt*0.05;
    } else if(tntt <= 10000000) {
        return tntt*0.1 - 250000;    
    } else if(tntt <= 18000000) {
        return tntt*0.15 - 750000
    } else if(tntt <= 32000000) {
        return tntt*0.2 - 1650000;
    } else if(tntt <= 52000000) {
        return tntt*0.25 - 3250000;
    } else if(tntt <= 80000000) {
        return tntt*0.3 - 5.85;
    } else if(tntt > 80000000) {
        return tntt*0.35 - 9850000;
    } else {
        return -1;
    }
}  

export const calculateTax = (
    tn: number,
    bh: number,
    snpt: number,
    zone: string,
) => {
    const bhxh = bh*0.08;
    const bhyt = bh* 0.015;
    const bhtn = bh*0.01;
    const tnbh = bhtn + bhxh + bhyt; 

    const gtbt = 11000000;
    const gtnpt = snpt*4400000;
    const gt = gtbt + gtnpt;

    const tntt = tn - tnbh - gt;
    const t = calulateTaxRate(tntt);
    const tnst = tn - tnbh - t;

    return {
        tn: tn,
        bh: bh,
        snpt: snpt,
        zone: zone,

        bhxh: bhxh,
        bhyt: bhyt,
        bhtn: bhtn,
        tnbh: tnbh,

        gtbt: gtbt,
        gtnpt: gtnpt,
        gt: gt,

        tntt: tntt,
        t: t,
        tnst: tnst,
    }
}