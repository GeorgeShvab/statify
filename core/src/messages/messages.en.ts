export default {
  chart: {
    copying_success: "The chart was copied to the clipboard",
    copying_fail:
      "Unexpected error occured, the chart was not copied to clipboard",
    empty_fallback: "Please, select at least one country",
    short_range_fallback: "Please, provide wider year range",
    max_items_error: "You can add maximum of 15 regions to the chart",
  },
  common: {
    bookmarks: "Bookmarks",
    search: "Search",
    search_ellipsed: "Search...",
    home: "Home",
    signin: "Sign In",
    email: "Email",
    password: "Password",
    create: "Create",
    id: "ID",
    label: "Label",
    description: "Description",
    datapoints: "Datapoints",
    last_update: "Last update",
    hidden: "Hidden",
    sort_by: "Sort by {value}",
    region: "Region",
    value: "Value",
    trend: "Trend",
    year: "Year",
    name: "Name",
    type: "Type",
    iso2code: "Iso2Code",
    geocode: "GeoCode",
    status: "Status",
    source: "Source",
    dataset: "Dataset",
    unit_symbol: "Unit Symbol",
    precision: "Precision",
    rank: "Rank",
    absolute: "Absolute",
    unit: "Unit",
    search_tags: "Search Tags",
    save: "Save",
    edit: "Edit",
    cancel: "Cancel",
    confirm: "Confirm",
    date_of_update: "Date of update",
    date_of_creation: "Date of creation",
    to_home: "To home page",
    unrevertable_action: "This action can not be reverted.",
  },
  pages: {
    not_found: {
      metadata: {
        title: "Not Found",
        description: "This page is not exist",
      },
    },
    landing: {
      title: "Discover the World through Data",
      subtitle:
        "Explore our database featuring 100+ indicators for hundreds of regions worldwide. Create customizable charts, view trends, and access hundreds of thousands of data points.",
      search_placeholder: "Example: Birth rate",
      metadata: {
        description:
          "Explore our database featuring 100+ indicators for hundreds of regions worldwide.",
        description_long:
          "Explore our database featuring 100+ indicators for hundreds of regions worldwide. Create customizable charts, view trends, and access hundreds of thousands of data points.",
      },
    },
    search: {
      heading: 'Search results for "{value}"',
      heading_empty: "Search results for",
      no_query: "Enter a keyword or phrase",
      no_results: "No datasets found",
      metadata: {
        title: "Results for {value}",
        description: "Indicator results for {value}",
      },
    },
    bookmarks: {
      heading: "Your bookmarks",
      empty_fallback: "You have no bookmarks yet",
      metadata: {
        title: "Bookmarks",
        description:
          "Explore our database featuring 100+ indicators for hundreds of regions worldwide.",
      },
    },
    indicator: {
      unit: "Unit: {value}",
      source: "Source: {value}",
      bookmark: "Bookmark",
      unbookmark: "Unbookmark",
      download_xlsx: "Download as XLSX",
      download_csv: "Download as CSV",
      copy_chart: "Copy the chart as an image",
      edit_chart: "Edit Chart",
      back_to_all: "Back to all countries",
      related_indicators_label: "Related indicators",
      sort_by_value: "Sort by value",
      sort_by_year: "Sort by year",
      sort_by_region: "Sort by region name",
      metadata: {
        description: "Statistical data of {indicator} by country.",
        description_long:
          "Statistical data of {indicator} by country. {description}",
      },
    },
    indicator_country: {
      metadata: {
        description_long:
          "Statistical data of the {indicator} in {country}. {description}",
        title: "{label} in {name}",
        description: "Statistical data of the {label} in {name}.",
      },
    },
    signin: {
      heading: "Sign In",
      need_help: "Need help? Contact the admin.",
      metadata: {
        title: "Sign In",
        description: "Sign In as administrator to be able to edit data.",
      },
    },
    indicators_dashboard: {
      title: "Indicators Dashboard",
      subtitle:
        "Manage indicators: define descriptions, unit, and other essential details.",
      indicator_information: "Indicator Information",
      delete_indicator: "Delete Indicator",
      edit_indicator: "Edit Indicator",
      new_indicator: "New Indicator",
      search_placeholder: "Search by ID, name or description...",
      deleted_successfully: "Indicators deleted successfully",
      confirm_deletion: "Are you sure you want to delete indicator ({id})?",
      deletion_unrevertable:
        "This action can not be reverted. Associated with indicator values will be deleted too.",
      confirm_multiple_deletion:
        "Are you sure you want to delete selected indicators ({count})?",
      deletion_multiple_unrevertable:
        "This action can not be reverted. Associated with indicators values will be deleted too.",
      created_successfully: "Indicator was created successffully",
      updated_successfully: "Indicator was updated successffully",
      show_chart: "Show chart",
      metadata: {
        title: "Indicators Dashboard",
        description: "Edit indicators here: add, update or delete.",
      },
      selects: {
        sort: {
          by_id: "ID",
          by_label: "Label",
          by_datapoints: "Datapoints",
          by_date_of_update: "Date of update",
        },
        status: {
          all: "All statuses",
          visible: "Visible",
          hidden: "Hidden",
        },
        type: {
          all: "All types",
          absolute: "Absolute",
          relative: "Relative",
        },
      },
    },
    countries_dashboard: {
      title: "Countries Dashboard",
      subtitle:
        "Manage country records: view, edit, and add details for individual countries.",
      country_information: "Country Information",
      delete_country: "Delete Country",
      edit_country: "Edit Country",
      new_country: "New Country",
      search_placeholder: "Search by ID, name, geocode or iso2code...",
      deleted_successfully: "Countries deleted successfully",
      confirm_deletion: "Are you sure you want to delete country ({id})?",
      deletion_unrevertable:
        "This action can not be reverted. Associated with country values will be deleted too.",
      confirm_multiple_deletion:
        "Are you sure you want to delete selected countries ({count})?",
      deletion_multiple_unrevertable:
        "This action can not be reverted. Associated with country values will be deleted too.",
      created_successfully: "Country was created successffully",
      updated_successfully: "Country was updated successffully",
      metadata: {
        title: "Countries Dashboard",
        description: "Edit countries here: add, update or delete.",
      },
      selects: {
        sort: {
          by_id: "ID",
          by_name: "Name",
          by_geocode: "GeoCode",
          by_iso2code: "Iso2Code",
          by_datapoints: "Datapoints",
          by_date_of_update: "Date of update",
        },
        status: {
          all: "All statuses",
          visible: "Visible",
          hidden: "Hidden",
        },
        type: {
          all: "All types",
          country: "Country",
          union: "Union",
          region: "Region",
          other: "Other",
        },
      },
    },
    values_dashboard: {
      title: "Values Dashboard",
      subtitle:
        "Manage data entries: review, update, and add values for indicators across countries and years.",
      value_information: "Value Information",
      delete_value: "Delete Value",
      edit_value: "Edit Value",
      new_value: "New Value",
      indicator_id: "Indicator ID",
      country_id: "Country ID",
      deleted_successfully: "Values deleted successfully",
      confirm_deletion: "Are you sure you want to delete value ({id})?",
      confirm_multiple_deletion:
        "Are you sure you want to delete selected values ({count})?",
      created_successfully: "Value was created successffully",
      updated_successfully: "Value was updated successffully",
      metadata: {
        title: "Values Dashboard",
        description: "Edit values here: add, update or delete.",
      },
      selects: {
        sort: {
          by_id: "ID",
          by_value: "Value",
          by_year: "Year",
          by_date_of_update: "Date of update",
          by_indicator_id: "Indicator ID",
          by_country_id: "Country ID",
        },
        country: {
          all: "All countries",
        },
        indicator: {
          all: "All indicators",
        },
      },
    },
    dashboard: {
      more_info: "More Information",
      hide_selected: "Hide all selected ({count})",
      expose_selected: "Expose all selected ({count})",
      delete_selected: "Delete selected ({count})",
      clear_selection: "Clear selection ({count})",
      not_found_fallback: "Nothing was found",
      clear_filters: "Clear filters",
    },
    terms_of_use: {
      title: "Terms of Use",
      last_update: "Last Updated: 01.02.2024",
      welcome:
        "Welcome to Statify! By using our website, you agree to comply with and be bound by the following terms of use. Please read these terms carefully before using Statify.",
      liability_title: "Disclaimer of Liability",
      liability_text:
        "We do not guarantee the accuracy, completeness, or reliability of the data. All data is provided by IMF and The World Bank.",
      use_of_information_title: "Use of Information",
      use_of_information_text:
        "Users are allowed to use statistical data from Statify for personal, educational, or commercial purposes. The data should not be used for illegal or harmful activities.",
      privacy_title: "Privacy Policy",
      privacy_text:
        "Statify does not collect any users' information. So there is no data to store or share.",
      ownership_title: "Ownership",
      ownership_text:
        "All design elements, code, scripts, and programming elements used on Statify are the intellectual property of Heorhii Shvab. Unauthorized reproduction, modification, or distribution of the code is strictly prohibited.",
      contact_title: "Contact Information",
      contact_text:
        "For questions, concerns, or requests related to the terms of use, please contact us at <a>georgiy.shvab@gmail.com</a>.",
      metadata: {
        title: "Terms of Use",
        description:
          "Terms of Use of Statify. By using our website, you agree to comply with and be bound by the following terms of use. Please read these terms carefully before using Statify.",
      },
    },
  },
  footer: {
    copyright: "© 2023-2025 Heorhii Shvab. All rights reserved.",
    terms: "Terms of Use",
  },
  admin_header: {
    indicators: "Indicators",
    countries: "Countries",
    values: "Values",
  },
  validation: {
    incorrect_credentials: "Incorrect password or email.",
    value_is_required: "The value field is required.",
    value_is_invalid: "The value is invalid.",
    year_is_required: "The year field is required.",
    year_is_invalid: "The year is invalid.",
    indicator_id_is_required: "The indicator ID is required.",
    indicator_id_is_invalid: "The indicator ID is invalid.",
    country_id_is_required: "The country ID is required.",
    country_id_is_invalid: "The country ID is invalid.",
    label_is_required: "The label field is required.",
    label_max_length_exceed: "The label cannot exceed 200 characters.",
    label_is_invalid: "The label is invalid.",
    description_max_length_exceed:
      "The description cannot exceed 1000 characters.",
    description_is_invalid: "The description is invalid.",
    source_is_required: "The source field is required.",
    source_max_length_exceed: "The source cannot exceed 150 characters.",
    source_is_invalid: "The source is invalid.",
    dataset_max_length_exceed: "The dataset cannot exceed 150 characters.",
    dataset_is_invalid: "The dataset is invalid.",
    unit_max_length_exceed: "The unit cannot exceed 150 characters.",
    unit_is_invalid: "The unit is invalid.",
    unit_symbol_max_length_exceed:
      "The unit symbol cannot exceed 50 characters.",
    unit_symbol_is_invalid: "The unit symbol is invalid.",
    precision_is_required: "The precision field is required.",
    precision_is_invalid: "The precision is invalid.",
    precision_min_value_exceed: "The precision cannot be less than 0.",
    precision_max_value_exceed: "The precision cannot exceed 10.",
    ranking_is_required: "The ranking field is required.",
    ranking_is_invalid: "The ranking is invalid.",
    ranking_min_value_exceed: "The ranking cannot be less than 0.",
    ranking_max_value_exceed: "The ranking cannot exceed 10.",
    hidden_is_required: "The hidden field is required.",
    hidden_is_invalid: "The hidden is invalid.",
    show_chart_is_required: "The showChart field is required.",
    show_chart_is_invalid: "The showChart is invalid.",
    absolute_is_required: "The absolute field is required.",
    absolute_is_invalid: "The absolute is invalid.",
    search_tag_is_required: "Each search tag is required.",
    search_tag_is_invalid: "Search tag is invalid.",
    search_tag_max_length_exceed: "A search tag cannot exceed 100 characters.",
    name_is_required: "The name field is required.",
    name_is_invalid: "The name is invalid.",
    name_min_length_exceed: "The name must be at least 3 characters long.",
    name_max_length_exceed: "The name cannot exceed 100 characters.",
    geoCode_is_required: "The geoCode field is required.",
    geoCode_is_invalid: "The geoCode is invalid.",
    iso2Code_is_required: "The iso2Code field is required.",
    iso2Code_is_invalid: "The iso2Code is invalid.",
    status_is_required: "The status field is required.",
    status_is_invalid: "The status is invalid.",
    type_is_required: "The type field is required.",
    type_is_invalid: "The type is invalid.",
    id_is_required: "The ID is required.",
    id_max_length_exceed: "The ID cannot exceed 50 characters.",
  },
  errors: {
    server_error: "Server Error",
    page_not_found: "Page is not found",
    unexpected_error: "Unexpected error occured",
  },
} as const
