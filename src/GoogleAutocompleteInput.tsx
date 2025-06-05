'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleAutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  googleMapApiKey: string;
  searchingRegion?: string[];
}

declare global {
  namespace google {
    namespace maps {
      namespace places {
        interface PlaceAutocompleteElement extends HTMLElement {
          setAttribute(name: string, value: string): void;
          addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
        }
      }
    }
  }
}

export default function GoogleAutocompleteInput({
  value,
  onChange,
  placeholder = '',
  className = '',
  googleMapApiKey,
  searchingRegion = ['us', 'in'],
}: GoogleAutocompleteInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autocompleteElement, setAutocompleteElement] = useState<google.maps.places.PlaceAutocompleteElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !googleMapApiKey) {
      console.error('Google Maps API key or containerRef is missing.');
      return;
    }

    const loadGoogleMaps = async () => {
      try {
        const loader = new Loader({
          apiKey: googleMapApiKey,
          version: 'weekly',
          libraries: ['places'],
        });

        await loader.importLibrary('places');

        if (containerRef.current) containerRef.current.innerHTML = '';

        const element = new (google.maps.places.PlaceAutocompleteElement as any)({
          includedRegionCodes: searchingRegion,
        });

        if (!element) {
          console.error('Failed to initialize PlaceAutocompleteElement.');
          return;
        }

        if (placeholder) element.setAttribute('placeholder', placeholder);
        if (value) element.setAttribute('value', value);

        if (containerRef.current) {
          containerRef.current.appendChild(element);
        }
        setAutocompleteElement(element);

        element.addEventListener('gmp-select', async (event: any) => {
          const placePrediction = event.placePrediction;
          if (placePrediction) {
            const place = placePrediction.toPlace();
            await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location'] });
            onChange(place.toJSON());
          }
        });

        element.addEventListener('input', (event: Event) => {
          const inputEvent = event as InputEvent;
          const target = inputEvent.target as HTMLInputElement;
          onChange(target.value);
        });
      } catch (error) {
        console.error('Error loading Google Maps Place Autocomplete:', error);
      }
    };

    loadGoogleMaps();
  }, [placeholder, googleMapApiKey, searchingRegion, value]);

  return <div ref={containerRef} className={className} />;
}