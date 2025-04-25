import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaTimes, FaUsers, FaUserAlt, FaEnvelope, FaPhone, FaGamepad } from 'react-icons/fa';

function TournamentRegistrationModal({ isOpen, onClose, onSubmit, tournament }) {
  const [formData, setFormData] = useState({
    teamName: '',
    captainName: '',
    email: '',
    phone: '',
    region: '',
    members: ['', '', ''],
    agreeToRules: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...formData.members];
    newMembers[index] = value;
    
    setFormData(prev => ({
      ...prev,
      members: newMembers
    }));
    
    // Clear member error
    if (errors[`member${index}`]) {
      setErrors(prev => ({
        ...prev,
        [`member${index}`]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }
    
    if (!formData.captainName.trim()) {
      newErrors.captainName = 'Captain name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.region.trim()) {
      newErrors.region = 'Region is required';
    }
    
    // Validate team members
    formData.members.forEach((member, index) => {
      if (!member.trim()) {
        newErrors[`member${index}`] = `Team member ${index + 1} name is required`;
      }
    });
    
    if (!formData.agreeToRules) {
      newErrors.agreeToRules = 'You must agree to the tournament rules';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your API
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the onSubmit prop with the form data
      onSubmit(formData);
      
      // Reset form
      setFormData({
        teamName: '',
        captainName: '',
        email: '',
        phone: '',
        region: '',
        members: ['', '', ''],
        agreeToRules: false
      });
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error submitting registration:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit registration. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!tournament) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-white"
                  >
                    Register for {tournament.title}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white"
                    onClick={onClose}
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>

                {errors.submit && (
                  <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-lg">
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Team Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                        <FaUsers className="mr-2" /> Team Information
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="teamName" className="block text-sm font-medium text-gray-300 mb-1">
                            Team Name *
                          </label>
                          <input
                            type="text"
                            id="teamName"
                            name="teamName"
                            value={formData.teamName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 bg-gray-700 border ${errors.teamName ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                          {errors.teamName && (
                            <p className="mt-1 text-sm text-red-500">{errors.teamName}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="region" className="block text-sm font-medium text-gray-300 mb-1">
                            Region *
                          </label>
                          <select
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 bg-gray-700 border ${errors.region ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          >
                            <option value="">Select Region</option>
                            <option value="North India">North India</option>
                            <option value="South India">South India</option>
                            <option value="East India">East India</option>
                            <option value="West India">West India</option>
                            <option value="Central India">Central India</option>
                          </select>
                          {errors.region && (
                            <p className="mt-1 text-sm text-red-500">{errors.region}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Captain Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                        <FaUserAlt className="mr-2" /> Captain Information
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="captainName" className="block text-sm font-medium text-gray-300 mb-1">
                            Captain Name *
                          </label>
                          <input
                            type="text"
                            id="captainName"
                            name="captainName"
                            value={formData.captainName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 bg-gray-700 border ${errors.captainName ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                          {errors.captainName && (
                            <p className="mt-1 text-sm text-red-500">{errors.captainName}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                              <FaEnvelope className="inline mr-1" /> Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            />
                            {errors.email && (
                              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                              <FaPhone className="inline mr-1" /> Phone *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 bg-gray-700 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            />
                            {errors.phone && (
                              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Team Members */}
                    <div>
                      <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                        <FaGamepad className="mr-2" /> Team Members
                      </h4>
                      <div className="space-y-3">
                        {formData.members.map((member, index) => (
                          <div key={index}>
                            <label htmlFor={`member${index}`} className="block text-sm font-medium text-gray-300 mb-1">
                              Team Member {index + 1} *
                            </label>
                            <input
                              type="text"
                              id={`member${index}`}
                              value={member}
                              onChange={(e) => handleMemberChange(index, e.target.value)}
                              className={`w-full px-4 py-2 bg-gray-700 border ${errors[`member${index}`] ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            />
                            {errors[`member${index}`] && (
                              <p className="mt-1 text-sm text-red-500">{errors[`member${index}`]}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Agreement */}
                    <div className="pt-2">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="agreeToRules"
                            name="agreeToRules"
                            type="checkbox"
                            checked={formData.agreeToRules}
                            onChange={handleChange}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="agreeToRules" className="font-medium text-gray-300">
                            I agree to the tournament rules and regulations *
                          </label>
                          {errors.agreeToRules && (
                            <p className="mt-1 text-sm text-red-500">{errors.agreeToRules}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      className="mr-4 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Register Team'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default TournamentRegistrationModal;