import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useShopifyPhoneLookup } from "../../hooks";
import { Box, Flex, LoadingOverlay, Title } from "@mantine/core";
interface ShopifyPhoneInterface {
    onChange: Function
    phone: string | null
    setPhone: Function
}
export function ShopifyPhone({ phone, setPhone, onChange }: ShopifyPhoneInterface) {
    const [customer, doPhoneLookup, isLookupLoading] = useShopifyPhoneLookup()
    function handlePhone(p: string) {
        if (p.length === 11) {
            console.log('got phone', p)
            doPhoneLookup(p)
        }
        setPhone(p)
    }
    useEffect(() => {
        console.log(customer)
        if (customer !== undefined) { onChange(customer) }
    }, [customer])
    console.log(phone)
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
