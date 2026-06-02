export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          business_area: string
          business_description: string | null
          company_name: string | null
          contact_info: string | null
          created_at: string
          email: string
          email_error: string | null
          email_status: string
          existing_website: string | null
          gdpr_consent: boolean
          id: string
          name: string
          phone: string
          photo_urls: string[] | null
          preferred_colors: string | null
          services_list: string | null
          updated_at: string
        }
        Insert: {
          business_area: string
          business_description?: string | null
          company_name?: string | null
          contact_info?: string | null
          created_at?: string
          email: string
          email_error?: string | null
          email_status?: string
          existing_website?: string | null
          gdpr_consent?: boolean
          id?: string
          name: string
          phone: string
          photo_urls?: string[] | null
          preferred_colors?: string | null
          services_list?: string | null
          updated_at?: string
        }
        Update: {
          business_area?: string
          business_description?: string | null
          company_name?: string | null
          contact_info?: string | null
          created_at?: string
          email?: string
          email_error?: string | null
          email_status?: string
          existing_website?: string | null
          gdpr_consent?: boolean
          id?: string
          name?: string
          phone?: string
          photo_urls?: string[] | null
          preferred_colors?: string | null
          services_list?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      order_submissions: {
        Row: {
          city: string
          company_address: string | null
          company_name: string | null
          country: string
          created_at: string
          dic: string | null
          email: string
          first_name: string
          gdpr_consent: boolean
          ic_dph: string | null
          ico: string | null
          id: string
          is_company: boolean
          last_name: string
          payment_status: string
          phone: string
          postal_code: string
          street: string
          stripe_session_id: string | null
          updated_at: string
        }
        Insert: {
          city: string
          company_address?: string | null
          company_name?: string | null
          country?: string
          created_at?: string
          dic?: string | null
          email: string
          first_name: string
          gdpr_consent?: boolean
          ic_dph?: string | null
          ico?: string | null
          id?: string
          is_company?: boolean
          last_name: string
          payment_status?: string
          phone: string
          postal_code: string
          street: string
          stripe_session_id?: string | null
          updated_at?: string
        }
        Update: {
          city?: string
          company_address?: string | null
          company_name?: string | null
          country?: string
          created_at?: string
          dic?: string | null
          email?: string
          first_name?: string
          gdpr_consent?: boolean
          ic_dph?: string | null
          ico?: string | null
          id?: string
          is_company?: boolean
          last_name?: string
          payment_status?: string
          phone?: string
          postal_code?: string
          street?: string
          stripe_session_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      web_briefs: {
        Row: {
          ai_assistant_purpose: string | null
          analytics_tools: string | null
          budget_range: string | null
          business_one_liner: string | null
          company_name: string | null
          contact_form: boolean | null
          created_at: string
          crm_details: string | null
          custom_app_details: string | null
          data_storage_preference: string | null
          deadline: string | null
          email: string
          email_provider_current: string | null
          email_sent_at: string | null
          email_switch_resend: boolean | null
          existing_site_issues: string | null
          existing_site_url: string | null
          gdpr_consent: boolean
          goals: string[] | null
          has_brand: boolean | null
          has_existing_site: boolean | null
          has_internal_crm: boolean | null
          has_own_photos: boolean | null
          has_own_texts: boolean | null
          hosting_preference: string | null
          id: string
          internal_crm_details: string | null
          invoicing_switch_recommended: boolean | null
          invoicing_system: string | null
          is_starting: boolean | null
          languages: string | null
          main_features: string | null
          maintenance_package: boolean | null
          multilingual: boolean | null
          name: string
          needs_analytics: boolean | null
          needs_crm_integration: boolean | null
          needs_invoicing: boolean | null
          newsletter_form: boolean | null
          notes: string | null
          other_integrations: string | null
          payment_gateway_current: string | null
          payment_gateway_switch_stripe: boolean | null
          phone: string | null
          preferred_colors: string | null
          preferred_typography: string | null
          reference_sites: string | null
          self_edit: boolean | null
          sells_products: boolean | null
          special_features: string | null
          target_audience: string | null
          unique_selling_point: string | null
          updated_at: string
          wants_ai_assistant: boolean | null
          wants_blog: boolean | null
          wants_booking_system: boolean | null
          wants_custom_app: boolean | null
          wants_member_area: boolean | null
        }
        Insert: {
          ai_assistant_purpose?: string | null
          analytics_tools?: string | null
          budget_range?: string | null
          business_one_liner?: string | null
          company_name?: string | null
          contact_form?: boolean | null
          created_at?: string
          crm_details?: string | null
          custom_app_details?: string | null
          data_storage_preference?: string | null
          deadline?: string | null
          email: string
          email_provider_current?: string | null
          email_sent_at?: string | null
          email_switch_resend?: boolean | null
          existing_site_issues?: string | null
          existing_site_url?: string | null
          gdpr_consent?: boolean
          goals?: string[] | null
          has_brand?: boolean | null
          has_existing_site?: boolean | null
          has_internal_crm?: boolean | null
          has_own_photos?: boolean | null
          has_own_texts?: boolean | null
          hosting_preference?: string | null
          id?: string
          internal_crm_details?: string | null
          invoicing_switch_recommended?: boolean | null
          invoicing_system?: string | null
          is_starting?: boolean | null
          languages?: string | null
          main_features?: string | null
          maintenance_package?: boolean | null
          multilingual?: boolean | null
          name: string
          needs_analytics?: boolean | null
          needs_crm_integration?: boolean | null
          needs_invoicing?: boolean | null
          newsletter_form?: boolean | null
          notes?: string | null
          other_integrations?: string | null
          payment_gateway_current?: string | null
          payment_gateway_switch_stripe?: boolean | null
          phone?: string | null
          preferred_colors?: string | null
          preferred_typography?: string | null
          reference_sites?: string | null
          self_edit?: boolean | null
          sells_products?: boolean | null
          special_features?: string | null
          target_audience?: string | null
          unique_selling_point?: string | null
          updated_at?: string
          wants_ai_assistant?: boolean | null
          wants_blog?: boolean | null
          wants_booking_system?: boolean | null
          wants_custom_app?: boolean | null
          wants_member_area?: boolean | null
        }
        Update: {
          ai_assistant_purpose?: string | null
          analytics_tools?: string | null
          budget_range?: string | null
          business_one_liner?: string | null
          company_name?: string | null
          contact_form?: boolean | null
          created_at?: string
          crm_details?: string | null
          custom_app_details?: string | null
          data_storage_preference?: string | null
          deadline?: string | null
          email?: string
          email_provider_current?: string | null
          email_sent_at?: string | null
          email_switch_resend?: boolean | null
          existing_site_issues?: string | null
          existing_site_url?: string | null
          gdpr_consent?: boolean
          goals?: string[] | null
          has_brand?: boolean | null
          has_existing_site?: boolean | null
          has_internal_crm?: boolean | null
          has_own_photos?: boolean | null
          has_own_texts?: boolean | null
          hosting_preference?: string | null
          id?: string
          internal_crm_details?: string | null
          invoicing_switch_recommended?: boolean | null
          invoicing_system?: string | null
          is_starting?: boolean | null
          languages?: string | null
          main_features?: string | null
          maintenance_package?: boolean | null
          multilingual?: boolean | null
          name?: string
          needs_analytics?: boolean | null
          needs_crm_integration?: boolean | null
          needs_invoicing?: boolean | null
          newsletter_form?: boolean | null
          notes?: string | null
          other_integrations?: string | null
          payment_gateway_current?: string | null
          payment_gateway_switch_stripe?: boolean | null
          phone?: string | null
          preferred_colors?: string | null
          preferred_typography?: string | null
          reference_sites?: string | null
          self_edit?: boolean | null
          sells_products?: boolean | null
          special_features?: string | null
          target_audience?: string | null
          unique_selling_point?: string | null
          updated_at?: string
          wants_ai_assistant?: boolean | null
          wants_blog?: boolean | null
          wants_booking_system?: boolean | null
          wants_custom_app?: boolean | null
          wants_member_area?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
