export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Proyecto: {
        Row: {
          descripcion: string
          id: string
          id_usuario: string
          limite_integrantes: number
          nombre: string
        }
        Insert: {
          descripcion: string
          id?: string
          id_usuario?: string
          limite_integrantes: number
          nombre: string
        }
        Update: {
          descripcion?: string
          id?: string
          id_usuario?: string
          limite_integrantes?: number
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "Proyecto_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "Usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      Proyecto_tecnologia: {
        Row: {
          id_proyecto: string
          id_tecnologia: string
        }
        Insert: {
          id_proyecto?: string
          id_tecnologia?: string
        }
        Update: {
          id_proyecto?: string
          id_tecnologia?: string
        }
        Relationships: [
          {
            foreignKeyName: "Proyecto_tecnologia_id_proyecto_fkey"
            columns: ["id_proyecto"]
            isOneToOne: false
            referencedRelation: "Proyecto"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Proyecto_tecnologia_id_tecnologia_fkey"
            columns: ["id_tecnologia"]
            isOneToOne: false
            referencedRelation: "Tecnologia"
            referencedColumns: ["id"]
          },
        ]
      }
      Proyecto_trabajador: {
        Row: {
          id_proyecto: string
          id_trabajador: string
          rol: Database["public"]["Enums"]["Rol"]
        }
        Insert: {
          id_proyecto?: string
          id_trabajador?: string
          rol: Database["public"]["Enums"]["Rol"]
        }
        Update: {
          id_proyecto?: string
          id_trabajador?: string
          rol?: Database["public"]["Enums"]["Rol"]
        }
        Relationships: [
          {
            foreignKeyName: "Proyecto_trabajador_id_proyecto_fkey"
            columns: ["id_proyecto"]
            isOneToOne: false
            referencedRelation: "Proyecto"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Proyecto_trabajador_id_trabajador_fkey"
            columns: ["id_trabajador"]
            isOneToOne: false
            referencedRelation: "Trabajador"
            referencedColumns: ["id"]
          },
        ]
      }
      Tecnologia: {
        Row: {
          id: string
          nombre: string
        }
        Insert: {
          id?: string
          nombre: string
        }
        Update: {
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      Trabajador: {
        Row: {
          enfoque: string
          id: string
          id_usuario: string
          nombre: string
        }
        Insert: {
          enfoque: string
          id?: string
          id_usuario?: string
          nombre: string
        }
        Update: {
          enfoque?: string
          id?: string
          id_usuario?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "Trabajador_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "Usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      Trabajador_tecnologia: {
        Row: {
          experiencia: number
          id_tecnologia: string
          id_trabajador: string
        }
        Insert: {
          experiencia: number
          id_tecnologia?: string
          id_trabajador?: string
        }
        Update: {
          experiencia?: number
          id_tecnologia?: string
          id_trabajador?: string
        }
        Relationships: [
          {
            foreignKeyName: "Trabajador_tecnologia_id_tecnologia_fkey"
            columns: ["id_tecnologia"]
            isOneToOne: false
            referencedRelation: "Tecnologia"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Trabajador_tecnologia_id_trabajador_fkey"
            columns: ["id_trabajador"]
            isOneToOne: false
            referencedRelation: "Trabajador"
            referencedColumns: ["id"]
          },
        ]
      }
      Usuario: {
        Row: {
          correo: string
          id: string
        }
        Insert: {
          correo: string
          id?: string
        }
        Update: {
          correo?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Rol: "Lider" | "Integrante"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
