import type { CollectionConfig } from 'payload'

import { admins, anyone, editors } from '../access'
import { revalidateDocument } from '../hooks/revalidate'

/*
 * Booking forms (Figma Prestige/Booking/Form, "Booking v2"): three answers (service,
 * date and time, guests), an optional vehicle choice, then "Continue on WhatsApp".
 * "Add details, optional" reveals extra questions, which can be limited to services.
 * Services and vehicles are read live from their collections, so publishing a
 * vehicle adds it to every booking form.
 */

export const DETAIL_TYPES = [
  { value: 'text', label: 'Short text' },
  { value: 'email', label: 'Email' },
  { value: 'tel', label: 'Phone' },
  { value: 'number', label: 'Number' },
  { value: 'textarea', label: 'Long text' },
] as const

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: { group: 'Bookings', useAsTitle: 'title', defaultColumns: ['title', 'updatedAt'] },
  access: { read: anyone, create: admins, update: editors, delete: admins },
  hooks: { afterChange: [revalidateDocument(null, 'forms')] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Questions',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'serviceLabel', type: 'text', required: true, defaultValue: 'Service' },
                {
                  name: 'vehicleLabel',
                  type: 'text',
                  defaultValue: 'Vehicle',
                  admin: { description: 'Leave empty to hide the vehicle choice.' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'noPreferenceLabel', label: 'No preference option', type: 'text' },
                { name: 'noPreferenceDetail', label: 'No preference detail', type: 'text' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'dateLabel', type: 'text', required: true, defaultValue: 'Date' },
                {
                  name: 'timeLabel',
                  type: 'text',
                  defaultValue: 'Time',
                  admin: { description: 'Leave empty to ask for the date only.' },
                },
                { name: 'dateTimeLabel', label: 'Date and time label (phones)', type: 'text' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'adultsLabel', type: 'text', required: true, defaultValue: 'Adults' },
                { name: 'adultsHint', type: 'text' },
                {
                  name: 'childrenLabel',
                  type: 'text',
                  admin: { description: 'Leave empty to hide.' },
                },
                { name: 'childrenHint', type: 'text' },
              ],
            },
            {
              name: 'details',
              label: 'Extra questions ("Add details")',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'Used in the WhatsApp template as {name}. Letters only.',
                      },
                      validate: (v: unknown) =>
                        /^[a-zA-Z][a-zA-Z0-9]*$/.test(String(v ?? '')) ||
                        'Letters and numbers only, like flightNumber.',
                    },
                    { name: 'label', type: 'text', required: true },
                    {
                      name: 'type',
                      type: 'select',
                      required: true,
                      defaultValue: 'text',
                      options: [...DETAIL_TYPES],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'placeholder', type: 'text' },
                    { name: 'required', type: 'checkbox' },
                    {
                      name: 'width',
                      type: 'radio',
                      defaultValue: 'full',
                      options: [
                        { value: 'full', label: 'Full' },
                        { value: 'half', label: 'Half' },
                      ],
                    },
                  ],
                },
                {
                  name: 'services',
                  label: 'Only for these services',
                  type: 'relationship',
                  relationTo: 'services',
                  hasMany: true,
                  admin: {
                    description:
                      'Empty means every service, like "Flight number" only for Airport Transfers.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Buttons and messages',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'submitLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Continue on WhatsApp',
                },
                { name: 'detailsToggleLabel', label: 'Details link', type: 'text' },
              ],
            },
            { name: 'note', type: 'text', admin: { description: 'Small line under the button.' } },
            {
              name: 'consentLabel',
              type: 'text',
              admin: {
                description:
                  'If set, guests must tick this box (for example, agreeing to the privacy policy).',
              },
            },
          ],
        },
        {
          label: 'Delivery',
          fields: [
            {
              name: 'notify',
              label: 'Email alerts to',
              type: 'array',
              admin: {
                description:
                  'Each request is emailed here. Sent only when the mail server is set up.',
              },
              fields: [{ name: 'email', type: 'email', required: true }],
            },
          ],
        },
      ],
    },
  ],
}

export const SUBMISSION_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'closed', label: 'Closed' },
] as const

/** Every request is stored here first, so nothing is lost if WhatsApp is not sent. */
export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: 'Booking request', plural: 'Booking requests' },
  admin: {
    group: 'Bookings',
    useAsTitle: 'summary',
    defaultColumns: ['summary', 'status', 'createdAt'],
    description: 'Requests from the booking forms. Only the site itself can create them.',
  },
  // Created only by the server action (with overrideAccess); never through the API.
  access: { read: editors, create: () => false, update: editors, delete: admins },
  fields: [
    { name: 'summary', type: 'text', admin: { readOnly: true } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [...SUBMISSION_STATUSES],
      admin: { position: 'sidebar' },
    },
    { name: 'form', type: 'relationship', relationTo: 'forms', admin: { readOnly: true } },
    { name: 'service', type: 'relationship', relationTo: 'services', admin: { readOnly: true } },
    { name: 'vehicle', type: 'relationship', relationTo: 'vehicles', admin: { readOnly: true } },
    {
      type: 'row',
      fields: [
        { name: 'date', type: 'text', admin: { readOnly: true } },
        { name: 'time', type: 'text', admin: { readOnly: true } },
        { name: 'adults', type: 'number', admin: { readOnly: true } },
        { name: 'children', type: 'number', admin: { readOnly: true } },
      ],
    },
    { name: 'details', type: 'json', admin: { readOnly: true } },
    { name: 'message', label: 'WhatsApp message', type: 'textarea', admin: { readOnly: true } },
    { name: 'page', type: 'text', admin: { readOnly: true, position: 'sidebar' } },
    { name: 'notes', label: 'Internal notes', type: 'textarea' },
  ],
}
