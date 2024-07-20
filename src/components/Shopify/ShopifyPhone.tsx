import { notifications } from "@mantine/notifications";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { usePhoneLookup } from "../../hooks";

export function ShopifyPhone() {
    const [phone, setPhone] = useState('')
    const [pin, setPin] = useState('')
    const [customer, doPhoneLookup, isLookupLoading, lookupDone] = usePhoneLookup()
    function handlePhone(p: string) {
        if (p.length === 11) {
          console.log('got phone', p)
          doPhoneLookup(p)
        }
        setPhone(p)
      }
    return (
        <>
            <div className='pickphone'>
                <PhoneInput
                    country={'us'}
                    value={phone}
                    inputClass='pickphoneinput'
                    onChange={(p: any) => handlePhone(p)}
                />
            </div>
        </>
    )
}
