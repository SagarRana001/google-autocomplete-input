# google-autocomplete-input

A React component for Google Places Autocomplete using the official PlaceAutocompleteElement.

## Installation

```bash
npm install google-autocomplete-input


import { GoogleAutocompleteInput } from 'google-autocomplete-input';

<GoogleAutocompleteInput
  value={value}
  onChange={(val) => setValue(val)}
  placeholder="Enter address"
  googleMapApiKey="YOUR_API_KEY"
/>
