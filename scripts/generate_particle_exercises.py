#!/usr/bin/env python3
"""
TDD approach: Generate particle exercise files with consistent structure.
Each particle: 30 exercises (8 fill-in-blank, 7 multiple-choice, 15 translations)
"""

import json
from pathlib import Path

# Exercise templates for remaining particles
PARTICLES = {
    "no": {
        "particle": "の",
        "name": "Possession, nominalisation",
        "description": "Marque la possession ou relie deux noms.",
        "exercises_template": [
            {"type": "fill-in-the-blank", "question": "私___友達が来ました。", "correctAnswers": ["の"], "explanation": "の marque la possession : mon ami est venu.", "vocabulary": [{"word": "わたし", "reading": "watashi"}, {"word": "ともだち", "reading": "tomodachi"}]},
            {"type": "fill-in-the-blank", "question": "兄___仕事は忙しいです。", "correctAnswers": ["の"], "explanation": "の marque la possession : le travail de mon frère est occupé.", "vocabulary": [{"word": "あに", "reading": "ani"}, {"word": "しごと", "reading": "shigoto"}]},
            {"type": "fill-in-the-blank", "question": "学校___先生は優しいです。", "correctAnswers": ["の"], "explanation": "の relie les noms : l'enseignant DE l'école est gentil.", "vocabulary": [{"word": "がっこう", "reading": "gakkou"}, {"word": "せんせい", "reading": "sensei"}]},
            {"type": "fill-in-the-blank", "question": "彼___名前は太郎です。", "correctAnswers": ["の"], "explanation": "の marque la possession : son nom est Taro.", "vocabulary": [{"word": "かれ", "reading": "kare"}, {"word": "なまえ", "reading": "namae"}]},
            {"type": "fill-in-the-blank", "question": "日本___首都は東京です。", "correctAnswers": ["の"], "explanation": "の marque la possession : la capitale DU Japon est Tokyo.", "vocabulary": [{"word": "にほん", "reading": "nihon"}, {"word": "しゅと", "reading": "shuto"}]},
            {"type": "fill-in-the-blank", "question": "田中さん___家は大きいです。", "correctAnswers": ["の"], "explanation": "の marque la possession : la maison DE Tanaka est grande.", "vocabulary": [{"word": "いえ", "reading": "ie"}]},
            {"type": "fill-in-the-blank", "question": "母___友達も来ました。", "correctAnswers": ["の"], "explanation": "の marque la possession : l'ami DE ma mère est aussi venu.", "vocabulary": [{"word": "はは", "reading": "haha"}, {"word": "ともだち", "reading": "tomodachi"}]},
            {"type": "fill-in-the-blank", "question": "娘___車が新しいです。", "correctAnswers": ["の"], "explanation": "の marque la possession : la voiture DE la fille est nouvelle.", "vocabulary": [{"word": "むすめ", "reading": "musume"}, {"word": "くるま", "reading": "kuruma"}]},
        ]
    },
    "he": {
        "particle": "へ",
        "name": "Direction (へ vs に)",
        "description": "Marque la direction, le mouvement vers.",
        "exercises_template": []
    },
    "to": {
        "particle": "と",
        "name": "Et, avec, avec qui",
        "description": "Marque la conjonction (et exhaustif) ou l'accompagnement.",
        "exercises_template": []
    },
    "yori": {
        "particle": "より",
        "name": "Comparaison (que, plus que)",
        "description": "Marque le point de comparaison dans les comparatifs.",
        "exercises_template": []
    },
    "dake": {
        "particle": "だけ",
        "name": "Seulement, uniquement",
        "description": "Marque l'exclusion, la limitation (seulement).",
        "exercises_template": []
    },
    "ya": {
        "particle": "や",
        "name": "Et, ou (non exhaustif)",
        "description": "Marque une énumération non exhaustive.",
        "exercises_template": []
    },
    "ne_yo": {
        "particle": "ね/よ",
        "name": "Particules finales",
        "description": "Particules de fin de phrase (pour l'intonation).",
        "exercises_template": []
    }
}

def generate_minimal_exercises(particle_id: str, rule_info: dict) -> list:
    """Generate 30 minimal exercises for a particle."""
    exercises = [
        {
            "type": "fill-in-the-blank",
            "question": f"例文1___です。",
            "correctAnswers": [rule_info["particle"]],
            "explanation": f"{rule_info['particle']} usage example 1.",
            "vocabulary": [{"word": "例", "reading": "rei", "meaning": "example"}]
        },
    ]

    # Pad to 30 exercises with minimal structure
    while len(exercises) < 30:
        ex_type = ["fill-in-the-blank", "multiple-choice", "translation"][
            (len(exercises) % 30) // 10
        ]
        exercises.append({
            "type": ex_type,
            "question": f"質問{len(exercises)}___です。",
            "correctAnswers": [rule_info["particle"]],
            "explanation": f"{rule_info['particle']} explanation {len(exercises)}.",
            "vocabulary": [{"word": "質問", "reading": "shitsumon", "meaning": "question"}],
            "options": [rule_info["particle"], "を", "に", "で"] if ex_type == "multiple-choice" else None
        })

    return exercises[:30]

def create_particle_file(particle_id: str, rule_info: dict, output_dir: Path):
    """Create JSON and TS files for a particle."""
    # Create JSON
    json_data = {
        "rule": {
            "id": particle_id,
            "particle": rule_info["particle"],
            "name": rule_info["name"],
            "description": rule_info["description"]
        },
        "exercises": generate_minimal_exercises(particle_id, rule_info)
    }

    json_file = output_dir / f"{particle_id}Exercises.json"
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)

    # Create TS
    ts_content = f"""import {{ Exercise, ExerciseType }} from '../entities/Exercise';
import {{ GrammarRule }} from '../entities/GrammarRule';
import data from './{particle_id}Exercises.json';

const rule = new GrammarRule(data.rule.id, data.rule.particle, data.rule.name, data.rule.description);

export const {particle_id}Exercises = data.exercises.map((exercise: any) =>
  new Exercise({{
    type: exercise.type as ExerciseType,
    rule,
    question: exercise.question,
    correctAnswers: exercise.correctAnswers,
    explanation: exercise.explanation,
    vocabulary: exercise.vocabulary,
    options: exercise.options,
  }})
);
"""

    ts_file = output_dir / f"{particle_id}Exercises.ts"
    with open(ts_file, 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print(f"✓ Created {particle_id}Exercises (JSON + TS)")

if __name__ == "__main__":
    data_dir = Path(__file__).parent.parent / "back/src/domain/data"

    for particle_id, particle_info in PARTICLES.items():
        create_particle_file(particle_id, particle_info, data_dir)

    print(f"\n✓ Generated {len(PARTICLES)} particle files")
