import { useForm } from '@mantine/form';
import { TextInput, Button, Checkbox, Grid, Divider, Textarea, Group, LoadingOverlay, Box, Autocomplete, OptionsFilter, ComboboxItem } from '@mantine/core';
import { GoogleAddressAutoComplete, predictionType, usePlacesAutocomplete } from '../../Google';
import { useEffect, useMemo, useState } from 'react';
import { dateFormat, isEmail, ShopifyCustomerT, uniqueKey } from '../../helpers';
import { useFetch, useOpenAI, useParams, useSaveForm } from '../../hooks';
import { isZip, stringOrBlank } from '../../helpers';


interface ShopifyCustomerInterface {
    phone: string
    customer: ShopifyCustomerT | undefined
    reset: Function
}
type KioskFormType = {
    _id: number | string
    date: string
    phone: string
    firstName: string
    lastName: string
    donations: string
    email: string
    zip: string
    address: string
    newsletter: boolean
    emailReceipt: boolean
}
export function ShopifyCustomer({ phone, customer, reset }: ShopifyCustomerInterface) {
    const [place, setPlace] = useState<predictionType>()
    const [searchValue, setSearchValue] = useState<string>("")
    const [addr, setAddr] = useState<string>()


    const params = useParams(['nosave', 'noprint'])

    const [saveForm, isBusy] = useSaveForm(customer, params.noSave, () => reset())
    const initialValues = useMemo(() => ({
        _id: uniqueKey(),
        shopifyId: stringOrBlank(customer?.id),
        date: dateFormat(null),
        firstName: stringOrBlank(customer?.first_name),
        lastName: stringOrBlank(customer?.last_name),
        company: stringOrBlank(customer?.default_address?.company),
        donations: '',
        email: stringOrBlank(customer?.email),
        zip: stringOrBlank(customer?.default_address?.zip),
        address: stringOrBlank(customer?.default_address?.address1),
        newsletter: false,
        emailReceipt: false,
        phone: phone,
        place: {}
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
            emailReceipt: (value, values) => ((value && !isEmail(values.email)) ? 'Email required' : null),
            zip: (value) => (isZip(value) ? 'Zip must have 5 characters' : null),
        },
    })
    const [predictions, googlePlace] = usePlacesAutocomplete(searchValue, addr)
    const [autocompleteData, setAutocompleteData] = useState<string[]>([])
    useEffect(() => {
        console.log('useEffect', predictions)
        if (predictions.length > 0) {
            let theData = predictions.map((p: predictionType) => p!.description)
            setAutocompleteData(theData)
        }
    }, [predictions])
    const optionsFilter: OptionsFilter = ({ options, search }) => {
        const splittedSearch = search.toLowerCase().trim().split(' ');
        return (options as ComboboxItem[]).filter((option) => {
            const words = option.label.toLowerCase().trim().split(' ');
            return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
        });
    };
    const handlePlaceChange = (p: any) => {
        setPlace(p)
        form.setFieldValue('place', p)
    }

    const handleSave = () => {
        console.log(place, form.values.address, form.values.place)
        if (place === undefined) {
            form.setFieldError('address', 'Please provide an address.')
        }
        form.validate()
        console.log(form.isValid(), form.errors)

        // saveForm(form.values)
        // reset()
        // form.clearErrors();
        // form.reset();
        // form.initialize(initialValues);    
    }
    return (
        <div className='pad-above-md'>
            <Divider className='pad-below' />
            <Box pos='relative'>
                <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <form /*onSubmit={form.onSubmit((values) => handleSave(values))}*/ className=''>
                    <Group grow justify="flex-end" >
                        <Button onClick={() => handleSave()} mt="lg" size='lg'>&nbsp;&nbsp;Done&nbsp;&nbsp;</Button>
                        <Button onClick={() => { form.clearErrors(); form.initialize(initialValues); reset() }} mt="lg" size='lg'>Start Over</Button>
                    </Group>
                    <Grid grow justify="space-between" align="center" className='pad-above-md'>
                        <Grid.Col span={4}>
                            <TextInput
                                label="First Name"
                                placeholder="First Name..."
                                size='lg'
                                withAsterisk
                                key={form.key('firstName')}
                                {...form.getInputProps('firstName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                label="Last Name"
                                placeholder="Last Name..."
                                size='lg'
                                withAsterisk
                                key={form.key('lastName')}
                                {...form.getInputProps('lastName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <TextInput
                                label="Zipcode"
                                size='lg'
                                placeholder="#####"
                                withAsterisk
                                key={form.key('zip')}
                                {...form.getInputProps('zip')}
                            />
                        </Grid.Col>
                    </Grid>
                    <TextInput
                        label="Company Name"
                        size='lg'
                        placeholder="Company name..."
                        key={form.key('company')}
                        {...form.getInputProps('company')}
                    />
                    <Textarea className='pad-above'
                        key={form.key('donations')}
                        {...form.getInputProps('donations')}
                        size="lg"
                        label="Donation"
                        withAsterisk
                        autosize
                        minRows={5}
                        description="Enter a list of items and quantities that you are donating."
                        placeholder="1 table, 4 chairs..."
                    />
                    <Grid grow justify="space-between" align="center">
                        <Grid.Col span={6}>
                            <TextInput
                                mt="sm"
                                label="Email"
                                size='lg'
                                placeholder="Email"
                                key={form.key('email')}
                                {...form.getInputProps('email')}
                            />
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Checkbox
                                label="Sign up for our newsletter?"
                                size="md"
                                key={form.key('newsletter')}
                                {...form.getInputProps('newsletter')}
                            />
                            <Checkbox
                                label="Email receipt?"
                                size="md"
                                key={form.key('emailReceipt')}
                                {...form.getInputProps('emailReceipt')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Autocomplete
                        label="Address"
                        placeholder="Address..."
                        size="lg"
                        key={form.key('address')}
                        value={searchValue}
                        onChange={setSearchValue}
                        data={autocompleteData}
                        filter={optionsFilter}
                        className='pad-above'
                    />
                    {/* <GoogleAddressAutoComplete address={customer?.formatted_address} setPlace={(p: any) => handlePlaceChange(p)} /> */}
                </form>
            </Box>
        </div >
    )
}
