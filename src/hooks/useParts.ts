import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Part, PartSearchParams, PartCreateInput, ApiError } from '@/types/part';
import { apiService } from '@/services/ApiService';
import { useToast } from '@/hooks/use-toast';

// Get all parts
export const useAllParts = () => {
  return useQuery({
    queryKey: ['parts'],
    queryFn: () => apiService.getAllParts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get part by ID
export const usePart = (id: string) => {
  return useQuery({
    queryKey: ['part', id],
    queryFn: () => apiService.getPartById(id),
    enabled: !!id,
  });
};

// Search parts
export const useSearchParts = (searchParams: PartSearchParams) => {
  return useQuery({
    queryKey: ['parts', 'search', searchParams],
    queryFn: () => apiService.searchParts(searchParams),
    enabled: Object.values(searchParams).some(value => !!value),
  });
};

// Create part mutation
export const useCreatePart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: PartCreateInput) => apiService.createPart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parts'] });
      toast({
        title: "Success",
        description: "Part created successfully",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Update part mutation
export const useUpdatePart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PartCreateInput> }) =>
      apiService.updatePart(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['parts'] });
      queryClient.invalidateQueries({ queryKey: ['part', data.id] });
      toast({
        title: "Success",
        description: "Part updated successfully",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Delete part mutation
export const useDeletePart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => apiService.deletePart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parts'] });
      toast({
        title: "Success",
        description: "Part deleted successfully",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};