import { notifications } from "@mantine/notifications";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { usePhoneLookup } from "../../hooks";
import { IconPointerOff } from "@tabler/icons-react";
import { Box, Flex, LoadingOverlay, Title } from "@mantine/core";
interface ShopifyPhoneInterface {
    onChange: Function
}
export function ShopifyPhone({ onChange }: ShopifyPhoneInterface) {
    const [phone, setPhone] = useState('')
    const [pin, setPin] = useState('')
    const [customer, doPhoneLookup, isLookupLoading] = usePhoneLookup()
    function handlePhone(p: string) {
        if (p.length === 11) {
            console.log('got phone', p)
            doPhoneLookup(p)
        }
        setPhone(p)
    }
    return (
        <>
            <LoadingOverlay visible={isLookupLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Box pos='relative'>
                <Flex gap='lg' justify={'center'} align={'flex-end'}>
                    <Title order={2}>Phone</Title>
                    <div className='pickphone'>
                        <PhoneInput
                            country={'us'}
                            value={phone}
                            inputClass='pickphoneinput'
                            onChange={(p: any) => handlePhone(p)}
                        />
                    </div>
                </Flex>
            </Box>
        </>
    )
}
