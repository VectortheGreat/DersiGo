import { countryList } from "@/utils/countryList";
import { timezones } from "@/utils/timezones";

export const inputTypes = [
  {
    type: "text",
    name: "firstName",
    id: "firstName",
    placeholder: "First Name",
    label: "First Name",
    col: 2,
    required: true,
  },
  {
    type: "text",
    name: "lastName",
    id: "lastName",
    placeholder: "Last Name",
    label: "Last Name",
    col: 2,
    required: true,
  },
  {
    type: "email",
    name: "email",
    id: "email",
    placeholder: "E-mail",
    label: "E-mail",
    col: 2,
    required: true,
  },
  {
    type: "text",
    name: "phone",
    id: "phone",
    placeholder: "Phone Number",
    label: "Phone",
    col: 2,
    required: true,
  },
  {
    type: "select",
    name: "gender",
    id: "gender",
    placeholder: "Gender",
    label: "Gender",
    col: 2,
    options: ["Male", "Female", "Other"],
    required: true,
  },
  {
    type: "select",
    name: "title",
    id: "title",
    placeholder: "Title",
    label: "Title",
    col: 2,
    options: ["Mr", "Ms", "Mrs", "Miss", "Dr"],
    required: true,
  },
  {
    type: "date",
    name: "dateOfBirth",
    id: "dateOfBirth",
    placeholder: "Date",
    label: "Birth Date",
    col: 2,
    required: false,
  },
  {
    type: "text",
    name: "picture",
    id: "picture",
    placeholder: "Picture Url",
    label: "Picture",
    col: 1,
    required: false,
  },
  {
    type: "text",
    name: "street",
    id: "street",
    placeholder: "Street is required if you want to add a location",
    label: "Street",
    col: 1,
    required: false,
  },
  {
    type: "text",
    name: "city",
    id: "city",
    placeholder: "City Location",
    label: "City",
    col: 2,
    required: false,
  },
  {
    type: "text",
    name: "state",
    id: "state",
    placeholder: "State Location",
    label: "State",
    col: 2,
    required: false,
  },
  {
    type: "select",
    name: "country",
    id: "country",
    placeholder: "Country Location",
    label: "Country",
    options: countryList,
    col: 2,
    required: false,
  },
  {
    type: "select",
    name: "timezone",
    id: "timezone",
    options: timezones,
    placeholder: "timezone",
    label: "Timezone",
    col: 2,
    required: false,
  },
];

export const postInputTypes = [
  {
    type: "text",
    name: "image",
    id: "image",
    placeholder: "Image Url",
    label: "Image",
    col: 1,
    required: true,
  },

  {
    type: "text",
    name: "text",
    id: "text",
    placeholder: "Post Text",
    label: "Text",
    col: 1,
    required: true,
  },
  {
    type: "text",
    name: "tags",
    id: "tags",
    placeholder: "Dog,Cat,Bird",
    label: "Tags",
    col: 1,
    required: false,
  },
  {
    type: "number",
    name: "likes",
    id: "likes",
    placeholder: "Number of Likes",
    label: "Likes",
    col: 2,
    required: false,
  },
  {
    type: "select",
    name: "owner",
    id: "owner",
    placeholder: "Post Owner",
    label: "Owner",
    col: 2,
    required: false,
  },
];
