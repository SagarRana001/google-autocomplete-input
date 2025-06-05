# google-autocomplete-input

A React component for Google Places Autocomplete using the official `PlaceAutocompleteElement`.

![Demo](https://github.com/SagarRana001/portfolio/blob/main/ezgif-507dfa8aea5931.gif)


## ✨ Features

- Lightweight and easy to use
- Integrates with Google Maps JavaScript API
- Supports custom regions and autocomplete filtering
- Built with React best practices and hooks

## 📦 Installation

```bash
npm install google-autocomplete-input
```

## 📥 Import

```tsx
import { GoogleAutocompleteInput } from 'google-autocomplete-input';
```

## 🌐 Google Maps API Reference

You will need a Google Maps API key with **Places API enabled**.  
Refer to the documentation:  
https://developers.google.com/maps/documentation/javascript/place-search#maps_place_text_search-html

## 🧪 Example Usage

```tsx
import React, { useState } from 'react';
import { GoogleAutocompleteInput } from 'google-autocomplete-input';

function App() {
  const [value, setValue] = useState('');

  return (
    <GoogleAutocompleteInput
      value={value}
      onChange={(val) => setValue(val)}
      placeholder="Enter address"
      googleMapApiKey="YOUR_API_KEY"
      searchingRegion={['in', 'us']}
    />
  );
}

export default App;
```

## 🔑 Props

| Prop              | Type                    | Description                                         |
|-------------------|-------------------------|-----------------------------------------------------|
| `value`           | `string`                | The current value of the input                      |
| `onChange`        | `(val: string) => void` | Callback function triggered when value changes      |
| `placeholder`     | `string`                | Placeholder text shown in the input                 |
| `googleMapApiKey` | `string`                | Your Google Maps API key                            |
| `searchingRegion` | `string[]`              | Region codes to prioritize (e.g., `['in', 'us']`)   |

## 🛠️ License

MIT
