import React from "react"
import { TouchableOpacity, Text, StyleSheet, Platform, TouchableOpacityProps } from 'react-native'

interface ISkillCardProps extends TouchableOpacityProps {
    skill: string
}

export function SkillCard({ skill, ...rest }: ISkillCardProps){
    return (
        <TouchableOpacity style={styles.buttonSkill} {...rest}>
            <Text style={styles.textSkill}>
                {skill}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonSkill: {
        backgroundColor: '#898F9C',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 15
    },
    textSkill: {
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold'
    }
})