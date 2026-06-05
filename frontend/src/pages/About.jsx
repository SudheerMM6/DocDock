import React from 'react'
import { assets } from '../assets/assets'
import { PageHeader } from '../components/layout/PageHeader'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'

const About = () => {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-white)]">
      <PageHeader
        title="About us"
        subtitle="A practical appointment booking project with patient, doctor, and admin workflows"
      />

      <Section size="sm">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="w-full lg:w-1/2">
              <img
                className="w-full rounded-card border border-[var(--border)] object-cover"
                src={assets.about_image}
                alt="Doctors in a clinic"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-5">
              <h2 className="text-2xl font-bold text-[var(--ink)] tracking-[-0.02em]">What DocDock does</h2>
              <p className="text-[var(--ink-secondary)] leading-relaxed">
                DocDock helps patients find doctors, book appointment slots, and manage basic profile details.
                The admin dashboard handles doctor records and appointment tracking.
              </p>
              <p className="text-[var(--ink-secondary)] leading-relaxed">
                The project keeps the scope clear: authentication, doctor listings, booking, payments,
                uploads, and role-based dashboards.
              </p>
              <div className="pt-4 border-t border-[var(--border)]">
                <h3 className="font-medium text-[var(--ink)] mb-2">Why this project exists</h3>
                <p className="text-[var(--ink-secondary)] text-sm leading-relaxed">
                  The goal is to show a working appointment system with clear frontend, backend, database,
                  and payment responsibilities.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section size="md" className="bg-[var(--surface)]">
        <Container>
          <h2 className="text-3xl font-bold text-[var(--ink)] text-center mb-8 tracking-[-0.02em]">
            Core workflows
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[var(--color-canvas-white)] rounded-card p-8 border border-[var(--border)]">
              <h3 className="font-semibold text-[var(--ink)] mb-2">Patient booking</h3>
              <p className="text-[var(--ink-secondary)] text-sm leading-relaxed">
                Patients can sign up, browse doctors, choose a slot, and view their appointments.
              </p>
            </div>
            <div className="bg-[var(--color-canvas-white)] rounded-card p-8 border border-[var(--border)]">
              <h3 className="font-semibold text-[var(--ink)] mb-2">Doctor dashboard</h3>
              <p className="text-[var(--ink-secondary)] text-sm leading-relaxed">
                Doctors can review appointment details, update availability, and manage profile information.
              </p>
            </div>
            <div className="bg-[var(--color-canvas-white)] rounded-card p-8 border border-[var(--border)]">
              <h3 className="font-semibold text-[var(--ink)] mb-2">Admin controls</h3>
              <p className="text-[var(--ink-secondary)] text-sm leading-relaxed">
                Admins can add doctors, manage availability, and track appointments from one panel.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}

export default About
