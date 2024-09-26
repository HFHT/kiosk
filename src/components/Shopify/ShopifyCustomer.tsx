import { useForm } from '@mantine/form';
import { TextInput, Button, Checkbox, Grid, Divider, Textarea, Group, LoadingOverlay, Box, Autocomplete, ComboboxItem } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { dateFormat, isEmail, numberOrNull, uniqueKey, isZip, stringOrBlank } from '../../utils';
import { useParams, usePlacesAutocomplete, useSaveForm } from '../../hooks';
import { predictionType, ShopifyCustomerT, } from '../../types';

interface ShopifyCustomerInterface {
    phone: string
    template: string | undefined
    customer: ShopifyCustomerT | undefined
    reset: Function
}
export type KioskFormType = {
    _id: number | string
    shopifyId: number | null
    date: string
    phone: string
    firstName: string
    lastName: string
    tags: string
    note: string
    company: string
    donations: string
    email: string
    zip: string
    address: string
    address2: string
    newsletter: boolean
    emailReceipt: boolean
    place: predictionType
}
export function ShopifyCustomer({ phone, template, customer, reset }: ShopifyCustomerInterface) {
    const [place, setPlace] = useState<predictionType | undefined>(customer && customer.formatted_address ? { description: customer.formatted_address } : undefined) //set either from Shopify customer or from the form's autocomplete
    const [searchValue, setSearchValue] = useState<string>(stringOrBlank(customer?.formatted_address))
    const [addrError, setAddrError] = useState<string>('')
    const [receiptValue, setReceiptValue] = useState(true)
    const [receiptError, setReceiptError] = useState<string>('')
    const [predictions] = usePlacesAutocomplete(searchValue)
    const [autocompleteData, setAutocompleteData] = useState<string[]>([])
    const params = useParams(['nosave', 'noprint'])

    useEffect(() => {
        console.log('useEffect', predictions)
        if (predictions && predictions.length > 0) {
            let theData = predictions.map((p: predictionType) => p!.description)
            setAutocompleteData(theData)
        }
    }, [predictions])

    const [saveForm, isBusy] = useSaveForm(params.noSave, template,
        () => {
            console.log('saveForm-callback')
            reset()
            form.clearErrors();
            form.reset();
            form.initialize(initialValues);
        }
    )
    const initialValues = useMemo(() => ({
        _id: uniqueKey(),
        shopifyId: numberOrNull(customer?.id),
        date: dateFormat(null),
        firstName: stringOrBlank(customer?.first_name),
        lastName: stringOrBlank(customer?.last_name),
        company: stringOrBlank(customer?.default_address?.company),
        donations: '',
        email: stringOrBlank(customer?.email),
        zip: stringOrBlank(customer?.default_address?.zip),
        address: stringOrBlank(customer?.default_address?.address1),
        address2: stringOrBlank(customer?.default_address?.address2),
        newsletter: false,
        emailReceipt: true,
        phone: phone,
        place: {},
        tags: stringOrBlank(customer?.tags),
        note: stringOrBlank(customer?.note)
    }), [customer])

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: initialValues,
        validate: {
            firstName: (value) => (value.length < 2 ? 'First name must have at least 2 letters' : null),
            lastName: (value) => (value.length < 2 ? 'Last name must have at least 2 letters' : null),
            donations: (value) => (value.length < 5 ? 'Donation must have at least 5 characters' : null),
            email: (value) => ((value === '' || isEmail(value)) ? null : 'Invalid email'),
            newsletter: (value, values) => ((value && !isEmail(values.email)) ? 'Email required' : null),
            zip: (value) => (isZip(value) ? 'Zip must have 5 characters' : null),
        },
    })

    const handleSave = () => {
        console.log('handleSave', receiptValue, form.getValues(), form.values, form.values.address, form.values.place)
        if (searchValue !== '' && place === undefined) {
            setAddrError('Invalid address, please select one.')
            return
        }
        if (form.getValues().email === '' && receiptValue) {
            setReceiptError('Email required.')
        } else {
            setReceiptError('')
        }
        form.validate()
        if (!form.isValid()) return
        saveForm({ ...form.getValues(), place: place!, emailReceipt: receiptValue },)
    }

    return (
        <div className='pad-above-md'>
            <Divider className='pad-below' />
            <Box pos='relative'>
                <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <form className=''>
                    <Group grow justify="flex-end" >
                        <Button onClick={() => handleSave()} mt="lg" size='lg'>&nbsp;&nbsp;Done&nbsp;&nbsp;</Button>
                        <Button onClick={() => { form.clearErrors(); form.initialize(initialValues); reset() }} mt="lg" size='lg'>Start Over</Button>
                    </Group>
                    <Grid grow justify="space-between" align="center" className='pad-above-md'>
                        <Grid.Col span={4}>
                            <TextInput label="First Name" placeholder="First Name..." size='lg' withAsterisk
                                key={form.key('firstName')}
                                {...form.getInputProps('firstName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput label="Last Name" placeholder="Last Name..." size='lg' withAsterisk
                                key={form.key('lastName')}
                                {...form.getInputProps('lastName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <TextInput label="Zipcode" size='lg' placeholder="#####" withAsterisk
                                key={form.key('zip')}
                                {...form.getInputProps('zip')}
                            />
                        </Grid.Col>
                    </Grid>
                    <TextInput label="Company Name" size='lg' placeholder="Company name..."
                        key={form.key('company')}
                        {...form.getInputProps('company')}
                    />
                    <Textarea className='pad-above' size="lg" label="Donation" withAsterisk autosize minRows={5}
                        description="Enter a list of items and quantities that you are donating."
                        placeholder="1 table, 4 chairs..."
                        key={form.key('donations')}
                        {...form.getInputProps('donations')}
                    />
                    <Grid grow justify="space-between" align="center">
                        <Grid.Col span={6}>
                            <TextInput mt="sm" label="Email" size='lg' placeholder="Email"
                                key={form.key('email')}
                                {...form.getInputProps('email')}
                            />
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Checkbox label="Sign up for our newsletter?" size="md"
                                key={form.key('newsletter')}
                                {...form.getInputProps('newsletter')}
                            />
                            <Checkbox label="Email receipt?" size="md"
                                error={receiptError}
                                checked={receiptValue}
                                onChange={() => setReceiptValue(!receiptValue)}
                            />
                        </Grid.Col>
                    </Grid>
                    <Autocomplete
                        className='pad-above' label="Address" placeholder="Address..." size="lg"
                        key={form.key('address')}
                        error={addrError}
                        value={searchValue}
                        onChange={setSearchValue}
                        onOptionSubmit={(v) => {
                            setAddrError('');
                            setPlace(predictions.find((p: predictionType) => p?.description === v))
                        }}
                        data={autocompleteData}
                        filter={
                            ({ options, search }) => {
                                const splittedSearch = search.toLowerCase().trim().split(' ');
                                return (options as ComboboxItem[]).filter((option) => {
                                    const words = option.label.toLowerCase().trim().split(' ');
                                    return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
                                });
                            }
                        }
                    />
                    <TextInput className='pad-above' label="Apartment, suite, etc" size='lg' placeholder="Address2..."
                        key={form.key('address2')}
                        {...form.getInputProps('address2')}
                    />
                </form>
            </Box>
        </div >
    )
}
