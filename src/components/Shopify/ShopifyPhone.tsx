import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useShopifyPhoneLookup } from "../../hooks";
import { Box, Button, Flex, LoadingOverlay, Switch, Title } from "@mantine/core";
interface ShopifyPhoneInterface {
    onChange: Function
    phone: string | null
    setPhone: Function
    anonymous: boolean
    setAnonymous: Function
}
export function ShopifyPhone({ phone, setPhone, anonymous, setAnonymous, onChange }: ShopifyPhoneInterface) {
    const [customer, doPhoneLookup, isLookupLoading] = useShopifyPhoneLookup()
    function handlePhone(p: string) {
        if (p.length === 11) { doPhoneLookup(p) }
        setPhone(p)
    }
    useEffect(() => {
        console.log('customer-useEffect', customer)
        if (customer !== undefined) { onChange(customer) }
    }, [customer])
    return (
        <>
            <LoadingOverlay visible={isLookupLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Box pos='relative' >
                <Flex gap='lg' justify={'center'} align={'flex-end'}>
                    <Flex gap='lg' justify={'center'} align={'flex-end'}>
                        <Title order={2}>Phone</Title>
                        <div className='pickphone'>
                            <PhoneInput disabled={anonymous} country={'us'} value={phone} inputClass='pickphoneinput'
                                onChange={(p: any) => handlePhone(p)}
                            />
                        </div>
                    </Flex>
                    <Switch
                        size='xl' label="Anonymous" labelPosition="left" onLabel="Yes" offLabel="No"
                        checked={anonymous}
                        onChange={(e) => {
                            onChange(!anonymous ? { phone: '', formatted_address: '' } : undefined)
                            setAnonymous(!anonymous)
                        }}
                    />
                </Flex>
            </Box>
        </>
    )
}
