"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Define a type for the suggestion item
interface AirportSuggestion {
  ident: string; // Airport code (e.g., "LAX")
  name: string; // Airport name (e.g., "Los Angeles International Airport")
}

/**
 * Searchbar component for searching airports by code.
 * This component includes an input field for user input,
 * fetches autocomplete suggestions from the server,
 * and navigates to the airport detail page upon selection.
 */
export default function Autocomplete() {
  const router = useRouter(); // Initialize the Next.js router for navigation
  const [inputValue, setInputValue] = useState<string>(''); // State for the input value
  const [suggestions, setSuggestions] = useState<AirportSuggestion[]>([]); // State for autocomplete suggestions

  /**
   * Handles changes in the input field.
   * Fetches suggestions based on the current input value.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Get the current input value
    setInputValue(value); // Update the input value state

    // Fetch suggestions if input length is greater than 1
    if (value.length > 1) {
      try {
        const response = await axios.get(`/api/autocomplete?query=${value}`); // Fetch suggestions
        console.log('API Response:', response.data); // Log the response to check
        setSuggestions(response.data); // Update suggestions state with the fetched data
      } catch (error) {
        console.error('Error fetching suggestions:', error); // Log any errors
      }
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  /**
   * Handles selection of a suggestion from the dropdown.
   * Navigates to the airport detail page based on the selected airport code.
   * 
   * @param {AirportSuggestion} item - The selected suggestion item.
   */
  const handleSelect = (item: AirportSuggestion) => {
    //router.push(`/airport/${item.code}`);  Navigate to the airport detail page
    const url = '/dashboard/search/' + item.ident;
    router.push(url);
    
    setInputValue(''); // Clear input after selection
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="relative">
      
      <input
        className="text-black rounded-full text-center"
        name="airport"
        type="text"
        value={inputValue} // Bind the input value to state
        onChange={handleChange} // Set up input change handler
        placeholder="Airport" // Placeholder text
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 bg-white border rounded">
          {suggestions.map((item) => (
            <li
              key={item.ident} // Unique key for each suggestion
              onClick={() => handleSelect(item)} // Set up click handler
              className="cursor-pointer p-2 hover:bg-gray-200 text-black" // Styling for suggestion items
            >
              {item.ident} - {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
